import React from "react";
import { Link } from "react-router-dom";
import { Flex, Avatar, Box } from "@chakra-ui/react";

const UserPost = () => {
  return (
    <div>
      <Link to={"/username/post/1"}>
        <Flex gap={3} marginBottom={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size={"md"} name="Olagunju Emmanuel" src="/mlo.jpg" />
            <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} w={"full"}></Box>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default UserPost;
