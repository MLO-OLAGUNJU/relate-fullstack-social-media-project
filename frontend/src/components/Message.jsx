import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoCheckmarkOutline, IoCheckmarkDone } from "react-icons/io5";
import { selectedConversationAttoms } from "../atoms/messagesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const Message = ({ ownMessage, message }) => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );

  const currentUser = useRecoilValue(userAtom);
  const { socket, onlineUsers } = useSocket();

  const getMessageStatus = () => {
    // If this is not an own message, don't show status
    if (!ownMessage) return null;

    // Check if the current user is the sender of the last message
    const isSender = currentUser._id === message.sender;

    if (!isSender) return null;

    // If the message is not seen
    if (!message.seen) {
      // Check if recipient is online
      const isRecipientOnline = onlineUsers.includes(
        selectedConversation.userId
      );

      if (!isRecipientOnline) {
        // Recipient is offline - single check
        return <IoCheckmarkOutline size={16} />;
      } else {
        // Recipient is online - double check (delivered)
        return <IoCheckmarkDone size={16} />;
      }
    } else {
      // Message is seen - blue double check
      return <IoCheckmarkDone size={16} className="text-sky-600" />;
    }
  };

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex maxWidth={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            <Text>{message.text}</Text>
            <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
              {getMessageStatus()}
            </Box>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Avatar src={currentUser.profilePic} w={7} h={7} />
          </Flex>
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text
            maxWidth={"350px"}
            bg={"#3a3a3a"}
            color={"white"}
            p={1}
            borderRadius={"md"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
