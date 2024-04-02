import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Flex, Avatar, Text, Image } from "@chakra-ui/react";

const PostPage = () => {
  return (
    <div>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/mlo.jpg" size={"md"} name="Olagunju Emmanuel" />
          <Flex>
            <Text fontSize={"small"} fontWeight={"bold"}>
              mlolagunju
            </Text>
            <RiVerifiedBadgeFill className="ml-1 text-sky-600" />
          </Flex>

          <Flex gap={4} alignItems={"center"}></Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default PostPage;
