import React, { useState } from "react";
import { Flex, Image, VStack, Button, useColorMode } from "@chakra-ui/react";
import { CgArrowLeft, CgMenuRight, CgMoon, CgSun } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClick1 = () => {
    setIsOpen(!isOpen);
    setIsOpen1(!isOpen1);
  };

  const combinedFunction1 = () => {
    handleClick();
    handleClick1();
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
          <div
            className={`flex items-start justify-start rounded-xl flex-col absolute w-[177px] top-8 right-8 overflow-hidden ${
              colorMode === "light" && "shadow-md"
            }`}
          >
            <button
              className={`w-full text-start pl-5 py-4  ${
                colorMode === "dark"
                  ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                  : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
              }`}
              onClick={combinedFunction1}
            >
              Appearance
            </button>
            <button
              className={`w-full text-start pl-5 py-4  ${
                colorMode === "dark"
                  ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                  : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
              }`}
              onClick={handleClick}
            >
              Your Profile
            </button>
            <button
              className={`w-full text-start pl-5 py-4  ${
                colorMode === "dark"
                  ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                  : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
              }`}
              onClick={handleClick}
            >
              Settings
            </button>
            <button
              className={`w-full text-start pl-5 py-4  ${
                colorMode === "dark" ? " bg-[#181818]" : "  bg-[#f9f9f9]"
              }`}
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        )}

        {isOpen1 && (
          <>
            <div
              className={`flex items-start justify-start rounded-xl p-4 w-full md:py-8 md:px-3 flex-col absolute md:w-[350px] top-10 md:right-8 overflow-hidden ${
                colorMode === "dark"
                  ? " bg-[#181818]"
                  : "shadow-md bg-[#f9f9f9]"
              }`}
            >
              <div className="flex items-center gap-14 w-full">
                <Button onClick={handleClick1} bg={"transparent"}>
                  <CgArrowLeft size={25} />
                </Button>
                <span className=" text-lg">Appearance</span>
              </div>

              <div className="grid grid-cols-2 w-full mt-10 gap-2">
                <Button
                  padding={6}
                  rounded={"xl"}
                  onClick={colorMode === "dark" && toggleColorMode}
                >
                  <CgSun size={30} />
                </Button>

                <Button
                  padding={6}
                  rounded={"xl"}
                  onClick={colorMode === "light" && toggleColorMode}
                >
                  <CgMoon size={30} />
                </Button>
              </div>
            </div>
          </>
        )}
      </Flex>
    </div>
  );
};

export default Header;
