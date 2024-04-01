import React, { useState } from "react";
import { Flex, Image, VStack, Button, useColorMode } from "@chakra-ui/react";
import { CgMenuRight } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Flex
        position={"relative"}
        justifyContent={"space-between"}
        mt={6}
        mb={12}
      >
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

        <button onClick={handleClick}>
          <CgMenuRight
            className={`transition opacity-30 hover:opacity-100 cursor-pointer ${
              colorMode === "dark" ? "text-white " : "text-black "
            }`}
            size={30}
          />
        </button>
        {isOpen && (
          <VStack position={"absolute"} top={4} right={4}>
            <Button bg={"transparent"}>Hello</Button>
            <Button bg={"transparent"}>Hello</Button>
            <Button bg={"transparent"}>Hello</Button>
            <Button bg={"transparent"}>Hello</Button>
          </VStack>
        )}
      </Flex>
    </div>
  );
};

export default Header;
