import React from "react";
import { Box, Flex, VStack, Text, Avatar } from "@chakra-ui/react";
const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Olagunju Emmanuel
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>olagunjuemmanuel</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              relate.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            cursor={"pointer"}
            name="MLO Olagunju"
            src="mlo.jpg"
            size={"xl"}
          />
        </Box>
      </Flex>

      <Text>
        JavaScript Alchemist | FullStack Engineer | MERNStack Developer | Web
        Developer | SFC® | AGILE | Theology Scholar
      </Text>

      <Flex w={"full"}></Flex>
    </VStack>
  );
};

export default UserHeader;
