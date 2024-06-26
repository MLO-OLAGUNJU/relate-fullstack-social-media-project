import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

//gwet user profile
const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("password")
      .select("updatedAt");
    if (!user) return res.status(400).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

//Signup User
const signUpUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser:", error.message);
  }
};

//logout User
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser:", error.message);
  }
};

//follow user
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

//update user
// const updateUser = async (req, res) => {
//   const { name, email, password, username, bio } = req.body;
//   let { profilePic } = req.body;
//   const userId = req.user._id;
//   try {
//     let user = await User.findById(userId);
//     if (!user) return res.status(400).json({ message: "User not found" });
//     if (req.params.id !== userId.toString())
//       return res.status(400).json({
//         error: "You cannot update another person's profile",
//       });
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       user.password = hashedPassword;
//     }

//     // setting the uploaded image from from frontend to backedn
//     // if (profilePic) {
//     //   if (user.profilePic) {
//     //     await cloudinary.uploader.destroy(
//     //       user.profilePic.split("/").pop().split("."[0])
//     //     );
//     //   }
//     //   const uploadedResponse = await cloudinary.uploader.upload(profilePic);
//     //   profilePic = uploadedResponse.secure_url;
//     // }

//     // if (user.profilePic && typeof user.profilePic === "string") {
//     //   const publicIdParts = user.profilePic.split("/");
//     //   const publicId = publicIdParts[publicIdParts.length - 1].split(".")[0];
//     //   await cloudinary.uploader.destroy(publicId);
//     // }

//     // Check if profilePic is a Base64 string
//     if (profilePic && profilePic.startsWith("data:image/")) {
//       try {
//         // Upload the image to Cloudinary
//         const uploadResponse = await cloudinary.uploader.upload(profilePic, {
//           upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
//         });

//         // Store the Cloudinary image URL
//         profilePic = uploadResponse.secure_url;
//       } catch (error) {
//         console.error("Error uploading image to Cloudinary:", error);
//         return res.status(500).json({ error: "Failed to upload image" });
//       }
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.username = username || user.username;
//     user.profilePic = profilePic || user.profilePic;
//     user.bio = bio || user.bio;

//     user = await user.save();

//     res.status(200).json({ message: "Profile updated succesfully", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//     console.log("Error in updateUser: ", err.message);
//   }
// };

const updateUser = async (req, res) => {
  const { name, email, password, username, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    if (req.params.id !== userId.toString())
      return res.status(400).json({
        error: "You cannot update another person's profile",
      });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Check if a new profilePic is provided
    if (profilePic) {
      // Delete the old profile picture from Cloudinary if it exists
      if (user.profilePic && typeof user.profilePic === "string") {
        const publicIdParts = user.profilePic.split("/");
        const publicId = publicIdParts[publicIdParts.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new profile picture to Cloudinary
      if (profilePic.startsWith("data:image/")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          });
          profilePic = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          return res.status(500).json({ error: "Failed to upload image" });
        }
      } else {
        // If profilePic is not a Base64 string, assume it's a URL
        profilePic = profilePic;
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile updated succesfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};

export {
  signUpUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
