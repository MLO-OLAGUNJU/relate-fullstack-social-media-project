import {
  Avatar,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const MessageContainer = () => {
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.600", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
      p={2}
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

      <Divider />

      {/* Message */}
      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        height={"300px"}
        overflowY={"scroll"}
      >
        {false &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default MessageContainer;
