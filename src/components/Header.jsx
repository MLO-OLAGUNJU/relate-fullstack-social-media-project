import React from "react";
import { Flex, Image, Button, useColorMode } from "@chakra-ui/react";
import { CgDarkMode } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justifyContent={"space-between"} mt={6} mb={12}>
        <Link to={"/"}>
          <Image
            cursor={"pointer"}
            alt="Spacelogo"
            w={"7"}
            src={
              colorMode === "dark"
                ? "/relate-logo.svg"
                : "/relate-light-logo.svg"
            }
          />
        </Link>

        <Button
          bg={"transparent"}
          h={"fit-content"}
          w={"fit-content"}
          padding={"1"}
          justifySelf={"flex-end"}
          onClick={toggleColorMode}
        >
          <CgDarkMode
            className={`transition ${
              colorMode === "dark" ? "text-white " : "text-black "
            }`}
            size={30}
          />
        </Button>
      </Flex>
    </div>
  );
};

export default Header;
