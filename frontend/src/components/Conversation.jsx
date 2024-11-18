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
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0]; // Assuming we have a userAtom with user data
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
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
    >
      {!lastMessage.seen && (
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
          alt="User"
          src="https://bit.ly/broken-link"
        >
          <AvatarBadge boxSize={"1em"} bg={"green.500"} />
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
          {currentUser._id === lastMessage.sender && !lastMessage.seen && (
            <IoCheckmarkDone size={16} />
          )}
          {currentUser._id === lastMessage.sender && lastMessage.seen && (
            <IoCheckmarkDone size={16} className="text-sky-600" />
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 14) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
