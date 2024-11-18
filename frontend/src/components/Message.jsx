import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { selectedConversationAttoms } from "../atoms/messagesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Message = ({ ownMessage, message }) => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );

  const currentUser = useRecoilValue(userAtom);

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxWidth={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={currentUser.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text
            maxWidth={"350px"}
            bg={"#3a3a3a"}
            color={"white"}
            p={1}
            borderRadius={"md"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
