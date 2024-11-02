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
import { Link as Linking, useLocation, useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const UserHeader = ({ user }) => {
  const location = useLocation();
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in

  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );

  console.log(following);

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
            <Text fontSize={"sm"}>{user.username}</Text>
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
                relate.net
              </Link>
            </Text>
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

      {currentUser._id !== user._id && (
        <Button size={"sm"}>{following ? "Unfollow" : "Follow"}</Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length}</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>mlo-olagunju-portfolio.vercel.app</Link>
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

                  {currentUser._id === user._id && (
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
        <Linking to="/username" className="flex-1">
          <Flex
            flex={1}
            justifyContent={"center"}
            pb={3}
            cursor={"pointer"}
            borderBottom={
              location.pathname === "/username"
                ? "3px solid white"
                : "1px solid #333638"
            }
            color={location.pathname === "/username" ? "white" : "gray.light"}
            _light={{
              color: location.pathname === "/username" ? "black" : "#a0a0a0",
              borderBottom:
                location.pathname === "/username"
                  ? "3px solid black"
                  : "1px solid #E5E5E5",
            }}
          >
            <Text fontWeight={"bold"}>Relates</Text>
          </Flex>
        </Linking>
        <Linking to="/username/replies" className="flex-1">
          <Flex
            flex={1}
            justifyContent={"center"}
            pb={3}
            cursor={"pointer"}
            borderBottom={
              location.pathname === "/username/replies"
                ? "3px solid white"
                : "1px solid #333638"
            }
            color={
              location.pathname === "/username/replies" ? "white" : "gray.light"
            }
            _light={{
              color:
                location.pathname === "/username/replies" ? "black" : "#a0a0a0",
              borderBottom:
                location.pathname === "/username/replies"
                  ? "3px solid black"
                  : "1px solid #E5E5E5",
            }}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Linking>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
