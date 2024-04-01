import React from "react";
import { Flex, Image, Button, useColorMode } from "@chakra-ui/react";
import { CgDarkMode } from "react-icons/cg";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justifyContent={"space-between"} mt={6} mb={12}>
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
          <CgDarkMode
            className={`transition ${
              colorMode === "dark" ? "text-black " : "text-white "
            }`}
            size={30}
          />
        </Button>
      </Flex>
    </div>
  );
};

export default Header;
