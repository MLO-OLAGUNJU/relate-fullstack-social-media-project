import React from "react";
import { Link } from "react-router-dom";
import { Flex, Avatar, Box, Text, Image } from "@chakra-ui/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

const UserPost = () => {
  return (
    <div>
      <Link to={"/username/post/1"}>
        <Flex gap={3} marginBottom={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size={"md"} name="Olagunju Emmanuel" src="/mlo.jpg" />
            <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
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
                  mlolagunju
                </Text>
                <RiVerifiedBadgeFill className="ml-1 text-sky-600" />
              </Flex>

              <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>
                  1d
                </Text>
                <BsThreeDots />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default UserPost;
