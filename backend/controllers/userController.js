import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
// import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

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

const loginUser = (async = (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in loginUser:", error.message);
  }
});

export { signUpUser, loginUser };