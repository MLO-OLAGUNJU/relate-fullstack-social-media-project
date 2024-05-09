import express from "express";
import { loginUser, signUpUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);

export default router;
