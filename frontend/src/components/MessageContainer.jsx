import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const MessageContainer = () => {
  return (
    <div>
      <Flex
        flex={70}
        bg={useColorModeValue("gray.600", "gray.dark")}
        borderRadius={"md"}
        flexDirection={"column"}
      >
        {/* Message Container */}

        <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
          <Avatar src="" size={"sm"} />
          <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
            Johndoe
            {/* {user.isVerified === true && ( */}
            <RiVerifiedBadgeFill
            // className={`ml-1 ${
            //   user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
            // }`}
            />
            {/* )} */}
          </Text>{" "}
        </Flex>
      </Flex>
    </div>
  );
};

export default MessageContainer;
