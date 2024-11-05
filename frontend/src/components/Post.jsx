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
} from "@chakra-ui/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";

const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  const showToast = useShowToast();

  //fetch user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);

        const data = await res.json();
        console.log(data);

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

  return (
    <div>
      <Flex gap={3} marginBottom={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name={user.name} src={user.profilePic} />
          <Box
            w={"1px"}
            h={"full"}
            bg={"#333638"}
            _light={{
              bg: "#E5E5E5",
            }}
            my={2}
          ></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={0}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              bottom={0}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
              position={"absolute"}
              bottom={0}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {user.username}
              </Text>
              {user.isVerified === true && (
                <RiVerifiedBadgeFill className="ml-1 text-sky-600" />
              )}
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              {/* <BsThreeDots /> */}

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
                          // onClick={copyUrl}
                          color={"red"}
                        >
                          Delete Post
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Box>
                </Menu>
              </Flex>
            </Flex>
          </Flex>

          <Link to={"/username/post/1"} className="flex flex-col gap-y-3">
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
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {post.replies.length} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* </Link> */}
    </div>
  );
};

export default Post;
