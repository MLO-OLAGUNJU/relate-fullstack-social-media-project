import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAttoms } from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (!setMessageText) return;
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
          <IoIosSend
            size={20}
            className="cursor-pointer"
            onClick={handleSubmitMessage}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
