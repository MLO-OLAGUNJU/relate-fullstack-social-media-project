import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  Flex,
  Avatar,
  Text,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  Button,
  Box,
  MenuItem,
  Image,
  Divider,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  useColorModeValue,
  ModalFooter,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { formatDistanceToNow } from "date-fns";
import FollowMenu from "../components/FollowMenu";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

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

const PostPage = () => {
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success", "Post link has been copied to clipboard", "error");
    });
  };

  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in
  const { user, loading } = useGetUserProfile();
  const { pid } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useState(null);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cancelLoading, setCancelLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`, {
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
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [pid, showToast]);

  const HandleDeletePost = async () => {
    try {
      onOpen(); // Just open the modal first
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const navigate = useNavigate();

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true); // Set delete button loading state
      const res = await fetch(`/api/posts/${posts._id}`, {
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
      onClose(); // Close the modal after successful deletion

      navigate(`/${user.username}`);
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

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!posts) return null;

  return (
    <>
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

      {isOpen && (
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
      )}
      <div>
        <Flex justifyContent={"space-between"}>
          <Flex w={"full"} alignItems={"center"} gap={3}>
            <Avatar src={user.profilePic} size={"md"} name={user.name} />
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
          </Flex>

          <Flex gap={4} alignItems={"center"}>
            <h1 className="flex items-center gap-1 text-xs text-gray-400">
              {formatTimeAgo(posts.createdAt)}
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

        <Text my={3}>{posts.text}</Text>
        {posts.img && (
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid "}
            borderColor={"#333638"}
            _light={{
              borderColor: "#E5E5E5",
            }}
          >
            <Image src={posts.img} w={"full"} />
          </Box>
        )}

        <Flex gap={3} my={3}>
          <Actions post={posts} />
        </Flex>

        <Divider my={4} />

        <Flex justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"2xl"}>🔔</Text>
            <Text color={"gray.light"}>
              Need a FullStack Engineer or Cloud Engineer?
            </Text>
          </Flex>
          <Link to={"mailto:oladeleemmanuelolagunju@gmail.com"}>
            <Button>Send email</Button>
          </Link>
        </Flex>
        <Divider my={4} />
        {posts.replies.map((reply) => (
          <Comments
            key={reply.id}
            reply={reply}
            lastReply={
              reply._id === posts.replies[posts.replies.length - 1]._id
            }
          />
        ))}
      </div>
    </>
  );
};

export default PostPage;
