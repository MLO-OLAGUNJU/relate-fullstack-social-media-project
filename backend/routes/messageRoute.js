import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/MessageController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:otherUserId", protectRoute, getMessages);

export default router;
