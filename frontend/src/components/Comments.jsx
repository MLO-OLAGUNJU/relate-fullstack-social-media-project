import React from "react";
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Comments = ({ reply, lastReply }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Flex gap={4} py={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={() => {
              navigate(`/${reply.username}`);
            }}
          >
            {reply.username}
          </Text>

          <Text fontSize={"xs"}>{reply.text}</Text>
        </Flex>
      </Flex>

      {!lastReply && <Divider />}
    </div>
  );
};

export default Comments;
