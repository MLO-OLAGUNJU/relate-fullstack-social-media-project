import React from "react";
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
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";

const PostPage = () => {
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
                    {/* <MenuItem
                      _light={{
                        bg: "gray.light",
                        // color: "#fff",
                      }}
                      bg={"gray.dark"}
                      color={"red"}

                      // onClick={copyUrl}
                    >
                      Report post
                    </MenuItem> */}
                  </MenuList>
                </Portal>
              </Box>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      <Text my={3}>Hehe everyone take a look at this </Text>
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
        <Image src={"/photo-1562038969-e85c13ecb2ac.avif"} w={"full"} />
      </Box>
      {/* )} */}

      <Flex gap={3} my={3}>
        <Actions />
      </Flex>
    </div>
  );
};

export default PostPage;
