import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
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

  // Color configurations for different message types
  const ownMessageBg = useColorModeValue("blue.300", "blue.600");
  const otherMessageBg = useColorModeValue("gray.200", "gray.700");
  const ownMessageTextColor = useColorModeValue("white", "white");
  const otherMessageTextColor = useColorModeValue("black", "white");
  const deliveredCheckColor = useColorModeValue("gray.600", "gray.300");
  const seenCheckColor = useColorModeValue("blue", "blue");

  const getMessageStatus = () => {
    if (!ownMessage) return null;

    const isSender = currentUser._id === message.sender;
    if (!isSender) return null;

    if (!message.seen) {
      const isRecipientOnline = onlineUsers.includes(
        selectedConversation.userId
      );

      if (!isRecipientOnline) {
        return <IoCheckmarkOutline size={16} color={deliveredCheckColor} />;
      } else {
        return <IoCheckmarkDone size={16} color={deliveredCheckColor} />;
      }
    } else {
      return <IoCheckmarkDone size={16} color={seenCheckColor} />;
    }
  };

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex
            maxWidth={"350px"}
            bg={ownMessageBg}
            p={1}
            borderRadius={"md"}
            color={ownMessageTextColor}
          >
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
            bg={otherMessageBg}
            color={otherMessageTextColor}
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
