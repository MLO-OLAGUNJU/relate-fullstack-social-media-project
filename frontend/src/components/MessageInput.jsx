import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationAtom,
  selectedConversationAttoms,
} from "../atoms/messagesAtom";
import Conversation from "./Conversation";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const [selectedConversation] = useRecoilState(selectedConversationAttoms);
  const setConversations = useSetRecoilState(conversationAtom);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (!messageText) return;
    setLoading(true);
    try {
      const res = await fetch(`api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);

      setConversations((prevConvo) => {
        const updatedConversations = prevConvo.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });

      setMessageText("");
    } catch (error) {
      showToast("Error", error.message), "error";
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmitMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Send a message"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <InputRightElement>
          {loading ? (
            <Spinner size={"sm"} />
          ) : (
            <IoIosSend
              size={20}
              className="cursor-pointer"
              onClick={handleSubmitMessage}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
