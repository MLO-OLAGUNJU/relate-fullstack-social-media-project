import express from "express";
import {
  followUser,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow:id", protectRoute, followUser);
// router.post("/unfollow:id", protectRoute, unfollowUser);

export default router;
