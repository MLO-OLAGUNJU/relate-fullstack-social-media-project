import React from "react";
import { Flex, Image, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image
          cursor={"pointer"}
          w={6}
          alt="Space's Logo"
          src="/spacelogo.svg"
        />
      </Flex>
    </div>
  );
};

export default Header;
