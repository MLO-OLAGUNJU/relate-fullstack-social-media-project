import { SearchIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  Avatar,
  WrapItem,
  Stack,
  AvatarBadge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationAtom,
  selectedConversationAttoms,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";
import { IoCheckmarkDone, IoCheckmarkOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";

// Enhanced Conversation Component with Mobile Selection
const ConversationItem = ({ conversation, isOnline, onSelectConversation }) => {
  const user = conversation.participants[0]; // Assuming we have a userAtom with user data
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;

  const getMessageStatus = () => {
    const isSender = currentUser._id === lastMessage.sender;

    if (!isSender) return null;

    if (!lastMessage.seen) {
      // Message is sent but not seen
      if (!isOnline) {
        // Recipient is offline - single check
        return <IoCheckmarkOutline size={16} className="text-gray-500" />;
      } else {
        // Recipient is online - double check (delivered)
        return <IoCheckmarkDone size={16} className="text-gray-500" />;
      }
    } else {
      // Message is seen - blue double check
      return <IoCheckmarkDone size={16} className="text-sky-600" />;
    }
  };

  const truncateText = (text, maxLength = 18, truncateLength = 14) => {
    return text.length > maxLength
      ? `${text.substring(0, truncateLength)}...`
      : text;
  };

  if (!user) return null;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );

  const handleConversationClick = () => {
    setSelectedConversation({
      _id: conversation._id,
      userId: user._id,
      userProfilePic: user.profilePic,
      username: user.username,
      isCEO: user.isCEO,
      isVerified: user.isVerified,
      mock: conversation.mock,
    });
    onSelectConversation();
  };

  return (
    <Flex
      onClick={handleConversationClick}
      alignItems="center"
      gap={3}
      p={2}
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
      position="relative"
      bg={
        selectedConversation?._id === conversation._id &&
        useColorModeValue("gray.200", "gray.dark")
      }
    >
      {/*  notification dot*/}
      {!lastMessage.seen && currentUser._id !== lastMessage.sender && (
        <Box
          position={"absolute"}
          top={3}
          right={3}
          p={1}
          border={"1px solid blanchedalmond"}
          borderRadius={"100%"}
          className="bg-sky-600"
        />
      )}
      <WrapItem>
        <Avatar
          size={{
            base: "sm",
            md: "md",
            sm: "sm",
          }}
          alt={user.username}
          src={user.profilePic}
        >
          {isOnline && <AvatarBadge boxSize={"1em"} bg={"green.500"} />}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user.username}
          {user.isVerified === true && (
            <RiVerifiedBadgeFill
              className={`ml-1 ${
                user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
              }`}
            />
          )}
        </Text>

        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {getMessageStatus()}
          <span>
            {lastMessage.text && truncateText(lastMessage.text)}
            {conversation && !lastMessage.text && "sent an Image 🖼️"}
            {!conversation && "Start a chat"}
          </span>
        </Text>
      </Stack>
    </Flex>
  );
};

const ChatPage = () => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);

  // Mobile View State
  const [isMobileConversationView, setIsMobileConversationView] =
    useState(false);

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAttoms
  );

  const { socket, onlineUsers } = useSocket();

  // Socket message seen listener (unchanged)
  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  // Mobile Responsive Listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileConversationView(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Conversation Selection for Mobile
  const handleSelectConversation = () => {
    if (window.innerWidth < 768) {
      setIsMobileConversationView(true);
    }
  };

  // Handle Return to Conversation List
  const handleBackToConversationList = () => {
    setIsMobileConversationView(false);
    setSelectedConversation({});
  };

  // Search Conversation Handler (unchanged)
  const HandleSearchConversation = async (e) => {
    e.preventDefault();
    setSearchText("");
    setLoadingSearch(true);
    try {
      const res = await fetch(`api/users/profile/${searchText}`);
      const data = await res.json();

      if (!currentUser) {
        showToast("Error", "Current user information is missing", "error");
        return;
      }

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (data._id === currentUser._id) {
        showToast(
          "Error",
          "Cannot start a conversation with yourself",
          "error"
        );
        return;
      }

      const existingConversation = conversations.find((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === data._id
        )
      );

      if (existingConversation) {
        setSelectedConversation({
          _id: existingConversation._id,
          userId: data._id,
          username: data.username,
          userProfilePic: data.profilePic,
        });
        handleSelectConversation();
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: data._id,
            username: data.username,
            profilePic: data.profilePic,
          },
          {
            _id: currentUser._id,
            username: currentUser.username,
            profilePic: currentUser.profilePic,
          },
        ],
      };

      setConversations((prevConvs) => [...prevConvs, mockConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoadingSearch(false);
    }
  };

  // Fetch Conversations (unchanged)
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
      position="absolute"
      left="50%"
      w={{ base: "100%", md: "80%", lg: "950px" }}
      transform="translateX(-50%)"
      p={4}
    >
      <Flex
        gap={10}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        // height={"100vh"}
        mx="auto"
        justifyContent="space-between"
      >
        {/* Mobile & Desktop Conversation List View */}
        {!isMobileConversationView ? (
          <Flex
            flex={{ base: 1, md: 0.3 }}
            gap={1}
            flexDirection="column"
            w="100%"
            maxW={{ sm: "250px", md: "full" }}
            mx="auto"
          >
            <Text
              fontWeight={700}
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Your Conversations
            </Text>

            {/* Search Input */}
            <form onSubmit={HandleSearchConversation}>
              <Flex alignItems="center" gap={1}>
                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  placeholder="Search for a user here"
                  outline={useColorModeValue("gray.600", "gray.700")}
                />
                <Button
                  size="sm"
                  onClick={HandleSearchConversation}
                  isLoading={loadingSearch}
                >
                  <SearchIcon />
                </Button>
              </Flex>
            </form>

            {/* Conversation Loading Skeletons */}
            {loadingConversations &&
              [0, 1, 2, 3, 4, 5].map((_, i) => (
                <Flex
                  key={i}
                  gap={4}
                  alignItems="center"
                  p={1}
                  borderRadius="md"
                >
                  <Box>
                    <SkeletonCircle size={10} />
                  </Box>
                  <Flex w="full" flexDirection="column" gap={3}>
                    <Skeleton h="10px" w="80px" />
                    <Skeleton h="8px" w="90%" />
                  </Flex>
                </Flex>
              ))}

            {/* Conversations List */}
            {!loadingConversations && (
              <>
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation._id}
                    isOnline={onlineUsers.includes(
                      conversation.participants[0]?._id
                    )}
                    conversation={conversation}
                    onSelectConversation={handleSelectConversation}
                  />
                ))}
              </>
            )}
          </Flex>
        ) : (
          // Mobile Conversation Detail View
          <Flex w="100%" flexDirection="column">
            <Flex
              alignItems="center"
              // mb={4}
              p={2}
              bg={useColorModeValue("gray.100", "gray.700")}
            >
              <ArrowBackIcon
                onClick={handleBackToConversationList}
                size={20}
                className="text-lg mr-5"
              />

              <Flex justifyContent={"center"}>
                <Avatar
                  src={selectedConversation.userProfilePic}
                  name={selectedConversation.username}
                  size="sm"
                  mr={2}
                />
                <Text fontWeight="bold">{selectedConversation.username}</Text>
              </Flex>
            </Flex>

            {selectedConversation._id && <MessageContainer />}
          </Flex>
        )}

        {/* Desktop Conversation Detail View */}
        {!isMobileConversationView && (
          <Flex
            display={{ base: "none", md: "flex" }}
            flex={0.7}
            borderRadius="md"
            p={2}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            height="400px"
          >
            {!selectedConversation._id ? (
              <>
                <GiConversation size={100} />
                <Text fontSize={20}>
                  Select a conversation to start messaging
                </Text>
              </>
            ) : (
              <MessageContainer />
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ChatPage;
