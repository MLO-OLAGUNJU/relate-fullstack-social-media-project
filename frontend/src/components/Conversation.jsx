import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import userAtom from "../atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAttoms } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0]; // Assuming we have a userAtom with user data
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;

  const getMessageStatus = () => {
    const isSender = currentUser._id === lastMessage.sender;

    if (!isSender) return null;

    if (!lastMessage.seen) {
      // Message is sent but not seen
      if (!user.isOnline) {
        // Recipient is offline - single check
        return <IoCheckmarkOutline size={16} className="text-gray-500" />;
      } else {
        // Recipient is online - double check (delivered)
        return <IoCheckmarkDone size={16} className="text-gray-500" />;
      }
    } else {
      // Message is seen - blue double check
      return <IoCheckmarkDone size={16} className="text-sky-600" />;
    }
  };

  const truncateText = (text, maxLength = 18, truncateLength = 14) => {
    return text.length > maxLength
      ? `${text.substring(0, truncateLength)}...`
      : text;
  };

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );

  if (!user) return null;

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      position={"relative"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => {
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          isCEO: user.isCEO,
          isVerified: user.isVerified,
          mock: conversation.mock,
        });
      }}
      bg={
        selectedConversation?._id === conversation._id &&
        useColorModeValue("gray.600", "gray.dark")
      }
    >
      {lastMessage && !lastMessage.seen && (
        <Box
          position={"absolute"}
          top={3}
          right={3}
          p={1}
          border={"1px solid blanchedalmond"}
          borderRadius={"100%"}
          className="bg-sky-600"
        />
      )}
      <WrapItem>
        <Avatar
          size={{
            base: "sm",
            md: "md",
            sm: "sm",
          }}
          alt={user.username}
          src={user.profilePic}
        >
          {user.isOnline && <AvatarBadge boxSize={"1em"} bg={"green.500"} />}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user.username}
          {user.isVerified === true && (
            <RiVerifiedBadgeFill
              className={`ml-1 ${
                user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
              }`}
            />
          )}
        </Text>

        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {getMessageStatus()}
          <span>{truncateText(lastMessage.text)}</span>
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
