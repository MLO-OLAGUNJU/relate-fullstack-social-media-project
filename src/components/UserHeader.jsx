import React from "react";
import { Box, Flex, VStack, Text, Avatar } from "@chakra-ui/react";
const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}> Olagunju Emmanuel</Text>
        </Box>
        <Box>
          <Avatar name="MLO Olagunju" src="mlo.jpg" size={"xl"} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
