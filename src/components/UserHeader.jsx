import React from "react";
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
} from "@chakra-ui/react";
import { CgInstagram, CgMore } from "react-icons/cg";
const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Olagunju Oladele Emmanuel
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>mlo-olagunju</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              <Link>relate.net</Link>
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

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>1.1M Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>mlo-olagunju-portfolio.vercel.app</Link>
        </Flex>
        <Flex>
          <Menu>
            <Box className="icon-container">
              <MenuButton>
                <CgMore size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem>Copy link</MenuItem>
                </MenuList>
              </Portal>
            </Box>
          </Menu>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
