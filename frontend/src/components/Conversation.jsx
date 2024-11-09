import {
  Avatar,
  AvatarBadge,
  Flex,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const Conversation = () => {
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "sm",
            md: "md",
          }}
          alt="User"
          src="https://bit.ly/broken-link"
        />

        <AvatarBadge boxSize={"1em"} bg={"gree.500"} />
      </WrapItem>
    </Flex>
  );
};

export default Conversation;
