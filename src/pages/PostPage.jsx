import React, { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  Flex,
  Avatar,
  Text,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  Box,
  MenuItem,
  Image,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
// import { useLocation } from "react-router-dom";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        status: "success",
        position: "bottom-center",
        duration: 3000,
        description: "Post link has been copied to clipboard",
      });
    });
  };
  return (
    <div>
      <Flex justifyContent={"space-between"}>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/mlo.jpg" size={"md"} name="Olagunju Emmanuel" />
          <Flex>
            <Text fontSize={"small"} fontWeight={"bold"}>
              mlolagunju
            </Text>
            <RiVerifiedBadgeFill className="ml-1 text-sky-600" />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"small"} color={"gray.light"}>
            1d
          </Text>
          <Flex>
            <Menu>
              <Box
                className="icon-container"
                _hover={{
                  bg: "transparent",
                }}
                pt={"6px"}
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
                        // color: 'red',
                      }}
                      bg={"gray.dark"}
                      color={"red.400"}
                      // onClick={copyUrl}
                    >
                      Unfollow
                    </MenuItem>
                    <MenuItem
                      _light={{
                        bg: "gray.light",
                        // color: "#fff",
                      }}
                      bg={"gray.dark"}
                      onClick={copyUrl}
                    >
                      Copy post URL
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Box>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      <Text my={3}>Be great always</Text>
      {/* {postImg && ( */}
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid "}
        borderColor={"#333638"}
        _light={{
          borderColor: "#E5E5E5",
        }}
      >
        <Image src={"/post1.avif"} w={"full"} />
      </Box>
      {/* )} */}

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          238 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {638 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
    </div>
  );
};

export default PostPage;
