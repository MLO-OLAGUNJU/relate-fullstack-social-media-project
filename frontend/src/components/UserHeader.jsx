import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Avatar,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  Link,
  useToast,
  Button,
} from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
import { Link as Linking, useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import useFollowToggle from "../hooks/useFollowToggle";

const UserHeader = ({ user, activeTab, handleTabClick }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in
  const [following, handleFolloworUnfollow, updating] = useFollowToggle(user);

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        status: "success",
        position: "bottom-center",
        duration: 3000,
        description: "Profile link has been copied to clipboard",
      });
    });
  };
  const navigate = useNavigate();
  const updateProfile = () => {
    navigate("/update");
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            {" "}
            <Flex alignItems={"center"}>
              <Text fontSize={"sm"}>{user.username}</Text>{" "}
              {user.isVerified === true && (
                <RiVerifiedBadgeFill
                  className={`ml-1 ${
                    user.isCEO ? "text-[#8fbd1a]" : "text-sky-600"
                  }`}
                />
              )}
            </Flex>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              <Link
                as={Linking}
                to={"/"}
                _light={{
                  color: "#fff",
                }}
              >
                <>relate.net</>
              </Link>
            </Text>
            {user.isCEO === true && (
              <h1 className="font-bold text-[#8fbd1a]">CEO & CTO of Relate</h1>
            )}
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              cursor={"pointer"}
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}

          {!user.profilePic && (
            <Avatar
              cursor={"pointer"}
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser?._id !== user._id && (
        <Button
          onClick={handleFolloworUnfollow}
          isLoading={updating}
          size={"sm"}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>
            {user.followers.length}{" "}
            {user.followers.length > 1 ? "followers" : "follower"}
          </Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text color={"gray.light"}>{user.following.length} following</Text>

          {/* <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box> */}
        </Flex>
        <Flex>
          <Menu>
            <Box
              className="icon-container"
              _hover={{
                bg: "transparent",
              }}
            >
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
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
                    onClick={copyUrl}
                  >
                    Copy Profile Link
                  </MenuItem>

                  {currentUser?._id !== user._id && (
                    <MenuItem
                      _light={{
                        bg: "gray.light",
                        color: "red",
                      }}
                      bg={"gray.dark"}
                      color={"red"}
                      // onClick={copyUrl}
                    >
                      Report
                    </MenuItem>
                  )}

                  {currentUser?._id === user._id && (
                    <MenuItem
                      _light={{
                        bg: "gray.light",
                        color: "#fff",
                      }}
                      bg={"gray.dark"}
                      onClick={updateProfile}
                    >
                      Update your profile
                    </MenuItem>
                  )}
                </MenuList>
              </Portal>
            </Box>
          </Menu>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
          borderBottom={
            activeTab === "relates" ? "3px solid white" : "1px solid #333638"
          }
          color={activeTab === "relates" ? "white" : "gray.light"}
          _light={{
            color: activeTab === "relates" ? "black" : "#a0a0a0",
            borderBottom:
              activeTab === "relates" ? "3px solid black" : "1px solid #E5E5E5",
          }}
          onClick={() => handleTabClick("relates")}
        >
          <Text fontWeight={"bold"}>Relates</Text>
        </Flex>
        <Flex
          flex={1}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
          borderBottom={
            activeTab === "replies" ? "3px solid white" : "1px solid #333638"
          }
          color={activeTab === "replies" ? "white" : "gray.light"}
          _light={{
            color: activeTab === "replies" ? "black" : "#a0a0a0",
            borderBottom:
              activeTab === "replies" ? "3px solid black" : "1px solid #E5E5E5",
          }}
          onClick={() => handleTabClick("replies")}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
