import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";

export default function UpdateProfilePage() {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.dark")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Update User Profile
        </Heading>
        <FormControl>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo" />
            </Center>
            <Center w="full">
              <Button w="full">Change Avatar</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="Emmanuel Olagunju"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="mlo_olagunju"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="mlo@mlo.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="Your bio"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            outline={useColorModeValue("gray.600", "gray.700")}
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={useColorModeValue("gray.600", "gray.700")}
            color={"white"}
            w="full"
            _hover={{
              bg: useColorModeValue("gray.700", "gray.800"),
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
