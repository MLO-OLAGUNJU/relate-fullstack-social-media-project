import React from "react";
import { Flex, Image, Button, useColorMode } from "@chakra-ui/react";
import { CgDarkMode } from "react-icons/cg";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image
          cursor={"pointer"}
          alt="Spacelogo"
          w={"10"}
          src="/spacelogo.svg"
        />

        <Button
          h={"fit-content"}
          w={"fit-content"}
          padding={"1"}
          justifySelf={"flex-end"}
          onClick={toggleColorMode}
        >
          {colorMode === "dark" ? (
            <CgDarkMode className="text-black" size={30} />
          ) : (
            <CgDarkMode className="text-white" size={30} />
          )}
        </Button>
      </Flex>
    </div>
  );
};

export default Header;
