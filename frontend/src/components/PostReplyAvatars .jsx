import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const PostReplyAvatars = ({ replies }) => {
  // Create a Set to store unique user IDs
  const uniqueUserIds = new Set();

  // Filter the replies to get the first three unique users
  const uniqueReplies = replies.filter((reply) => {
    if (uniqueUserIds.has(reply.userId)) {
      return false;
    }
    uniqueUserIds.add(reply.userId);
    return uniqueUserIds.size <= 3;
  });

  return (
    <Box position={"relative"} w={"full"}>
      {replies.length === 0 && <Text textAlign={"center"}>💤</Text>}
      {uniqueReplies.map((reply, index) => (
        <Avatar
          key={reply._id}
          size={"xs"}
          name={reply.username}
          src={reply.userProfilePic}
          position={"absolute"}
          top={index === 0 && "-5px"}
          bottom={index === 1 ? "0px" : index === 2 && "0px"}
          left={index === 0 ? "12px" : index === 2 && "3px"}
          right={index === 1 && "3px"}
          padding={"2px"}
        />
      ))}
    </Box>
  );
};

export default PostReplyAvatars;
