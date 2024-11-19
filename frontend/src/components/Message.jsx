import {
  Avatar,
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
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
  const [imgLoaded, setImgLoaded] = useState(false);

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
          {message.text && (
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
          )}
          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}

          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="Message image" borderRadius={4} />
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
                  {getMessageStatus()}
                </Box>
              </Box>
            </Flex>
          )}

          <Flex flexDirection="column" alignItems="center">
            <Avatar src={currentUser.profilePic} w={7} h={7} />
          </Flex>
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          {message.text && (
            <Text
              maxWidth={"350px"}
              bg={otherMessageBg}
              color={otherMessageTextColor}
              p={1}
              borderRadius={"md"}
            >
              {message.text}
            </Text>
          )}

          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}

          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="Message image" borderRadius={4} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
