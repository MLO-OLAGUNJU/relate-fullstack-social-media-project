import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import { conversationAtom } from "../atoms/messagesAtom";

const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationAtom);

  useEffect(() => {
    const getConversations = async () => {
      setLoadingConversations(true);
      try {
        const res = await fetch(`api/messages/conversations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        console.log(data);
        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    };

    getConversations();
  }, [showToast, setConversations]);

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "950px" }}
      transform={"translateX(-50%)"}
      p={4}
    >
      <Flex
        gap={10}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
        justifyContent={"space-between"}
      >
        <Flex
          flex={30}
          gap={1}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversations
          </Text>
          <form>
            <Flex alignItems={"center"} gap={1}>
              <Input
                placeholder="Search for a user here"
                outline={useColorModeValue("gray.600", "gray.700")}
              />
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>

          {loadingConversations &&
            [0, 1, 2, 3, 4, 5].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}

          {!loadingConversations && (
            <>
              {conversations.map((conversation) => (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                />
              ))}{" "}
            </>
          )}
        </Flex>

        {/* <Flex
          flex={70}
          borderRadius={"md"}
          p={2}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"400px"}
        >
          <GiConversation size={100} />
          <Text fontSize={20}>Select a conversation to start messaging</Text>
        </Flex> */}
        <MessageContainer />
      </Flex>
    </Box>
  );
};

export default ChatPage;
