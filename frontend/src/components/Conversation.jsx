import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

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
          Johndoe
          {/* {user.isVerified === true && ( */}
          <RiVerifiedBadgeFill
          // className={`ml-1 ${
          //   user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
          // }`}
          />
          {/* )} */}
        </Text>

        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          Hello, I'm John Doe!...
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
