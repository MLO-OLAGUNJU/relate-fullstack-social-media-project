import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/MessageController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:otherUserId", protectRoute, getMessages);
router.get("/conversations", protectRoute, getConversations);

export default router;
