import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Avatar,
  Box,
  Text,
  Image,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  Stack,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  ModalHeader,
  ModalContent,
  Modal,
  ModalCloseButton,
  ModalBody,
  FormControl,
  useDisclosure,
  useColorModeValue,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import FollowMenu from "./FollowMenu";
import postAtom from "../atoms/postAtom";
import PostReplyAvatars from "./PostReplyAvatars ";

const formatTimeAgo = (date) => {
  const distance = formatDistanceToNow(new Date(date))
    .replace("about ", "")
    .replace("less than ", "")
    .replace("a minute", "1s");
  // .replace("now ago", "just now");

  // Optional: Further shortening
  return distance
    .replace(" second", "s")
    .replace(" seconds", "s")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" years", "y")
    .replace(" year", "y");
};

const Post = ({ post, postedBy }) => {
  const currentUser = useRecoilValue(userAtom);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useRecoilState(postAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        // console.log(data);
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const [cancelLoading, setCancelLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const HandleDeletePost = async () => {
    try {
      onOpen(); // Just open the modal first
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true); // Set delete button loading state
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Relate deleted successfully", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setDeleteLoading(false); // Reset delete button loading state
    }
  };

  const cancelDelete = () => {
    setCancelLoading(true); // Set cancel button loading state
    onClose();
    setCancelLoading(false); // Reset cancel button loading state
  };

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success", "Post link has been copied to clipboard", "error");
    });
  };

  return (
    <div>
      {!user && (
        <Stack gap="2">
          <HStack width="full">
            <SkeletonCircle size="20" />
            <SkeletonText noOfLines={10} />
          </HStack>
          <Skeleton height="200px" />
        </Stack>
      )}

      {isOpen && (
        <Box
          onClick={onClose}
          backdropFilter="auto"
          position={"fixed"}
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={40}
          backdropBlur="5px"
        />
      )}

      <Modal isOpen={isOpen} onClose={cancelDelete}>
        <ModalContent bg={useColorModeValue("white", "gray.dark")}>
          <ModalHeader textAlign={"center"}></ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Text fontSize="md" my={4} textAlign={"center"}>
                Do you CONFIRM to Delete this Relate?
              </Text>

              <Flex
                direction="row"
                align="center"
                mx={"auto"}
                w={"fit-content"}
              >
                <Button
                  mr={3}
                  onClick={cancelDelete}
                  isLoading={cancelLoading}
                  disabled={deleteLoading} // Disable cancel button when delete is loading
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={confirmDelete}
                  isLoading={deleteLoading}
                  disabled={cancelLoading} // Disable delete button when cancel is loading
                >
                  Delete
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {user && (
        <Flex gap={3} marginBottom={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar
              size={"md"}
              name={user.name}
              src={user.profilePic}
              cursor={"pointer"}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/${user.username}`;
              }}
            />
            <Box
              w={"1px"}
              h={"full"}
              bg={"#333638"}
              _light={{
                bg: "#E5E5E5",
              }}
              my={2}
            ></Box>

            <PostReplyAvatars replies={post.replies} />
          </Flex>

          <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  cursor={"pointer"}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/${user.username}`;
                  }}
                >
                  {user.username}
                </Text>
                {user.isVerified === true && (
                  <RiVerifiedBadgeFill
                    className={`ml-1 ${
                      user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
                    }`}
                  />
                )}
              </Flex>

              <Flex gap={4} alignItems={"center"}>
                <h1 className="flex items-center gap-1 text-xs text-gray-400">
                  {formatTimeAgo(post.createdAt)}
                  <span>ago</span>
                </h1>

                <Flex>
                  <Menu>
                    <Box
                      className="icon-container"
                      _hover={{
                        bg: "transparent",
                      }}
                    >
                      <MenuButton>
                        <BsThreeDots cursor={"pointer"} />
                      </MenuButton>
                      <Portal>
                        <MenuList
                          bg={"gray.dark"}
                          _light={{
                            bg: "gray.light",
                          }}
                        >
                          {" "}
                          {currentUser?._id === user._id && (
                            <>
                              <MenuItem
                                _light={{
                                  bg: "gray.light",
                                  color: "#fff",
                                }}
                                bg={"gray.dark"}
                                onClick={copyUrl}
                              >
                                Copy Post URL
                              </MenuItem>
                              <MenuItem
                                _light={{
                                  bg: "gray.light",
                                  color: "#fff",
                                }}
                                bg={"gray.dark"}
                                // onClick={copyUrl}
                              >
                                Edit post
                              </MenuItem>
                              <MenuItem
                                _light={{
                                  bg: "gray.light",
                                  // color: "#fff",
                                }}
                                bg={"gray.dark"}
                                onClick={HandleDeletePost}
                                color={"red"}
                              >
                                Delete Post
                              </MenuItem>
                            </>
                          )}
                          {currentUser?._id !== user._id && (
                            <FollowMenu user={user} />
                          )}
                        </MenuList>
                      </Portal>
                    </Box>
                  </Menu>
                </Flex>
              </Flex>
            </Flex>

            {user.isCEO === true && (
              <h1 className="font-bold text-[#8fbd1a]">CEO & CTO of Relate</h1>
            )}

            <Link
              to={`/${user.username}/post/${post._id}`}
              className="flex flex-col gap-y-3"
            >
              <Text fontSize={"small"}>{post.text}</Text>

              {post.img && (
                <Box
                  borderRadius={6}
                  overflow={"hidden"}
                  border={"1px solid "}
                  borderColor={"#333638"}
                  _light={{
                    borderColor: "#E5E5E5",
                  }}
                >
                  <Image src={post.img} w={"full"} />
                </Box>
              )}
            </Link>

            <Flex gap={3} my={1}>
              <Actions post={post} />
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Post;
