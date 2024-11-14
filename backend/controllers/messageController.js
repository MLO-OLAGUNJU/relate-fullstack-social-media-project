import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const sendMessage = async (res, req) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });

      await conversation.save();
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sendMessage };
