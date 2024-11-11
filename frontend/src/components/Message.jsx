import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxWidth={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            architecto debitis eum incidunt repellendus
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text maxWidth={"350px"} bg={"gray.400"} p={1} border={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            architecto debitis eum incidunt repellendus
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
