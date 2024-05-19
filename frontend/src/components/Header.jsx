import React, { useState, useEffect } from "react";
import { Flex, Image, Button, useColorMode } from "@chakra-ui/react";
import { CgClose, CgMenuRight, CgMoon, CgSun } from "react-icons/cg";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".your-navbar-class")) {
      // Replace with your navbar class
      setIsOpen(false); // Close navbar if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener on component mount
    document.addEventListener("click", handleClickOutside);

    // Remove event listener on component unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); // Empty dependency array to run only once

  const combinedFunction1 = () => {
    if (colorMode === "dark") {
      toggleColorMode();
      handleClick();
    }
  };

  const combinedFunction2 = () => {
    if (colorMode === "light") {
      toggleColorMode();
      handleClick();
    }
  };

  return (
    <div className="your-navbar-class">
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
            className={`z-50 flex items-start justify-start rounded-xl p-4 w-full md:py-8 md:px-3 flex-col absolute md:w-[350px] top-10 md:right-8 overflow-hidden ${
              colorMode === "dark" ? " bg-[#181818]" : "shadow-md bg-[#f9f9f9]"
            }`}
          >
            <div className="flex items-center gap-14 w-full">
              <Button onClick={handleClick} bg={"transparent"}>
                <CgClose size={25} />
              </Button>
            </div>

            <Link to={"/mlo"}>
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
            </Link>
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

            {/*  */}
            <LogoutButton />
            {/*  */}
            <div className="grid grid-cols-2 w-full mt-3 gap-2">
              <Button padding={6} rounded={"xl"} onClick={combinedFunction1}>
                <CgSun size={30} />
              </Button>

              <Button padding={6} rounded={"xl"} onClick={combinedFunction2}>
                <CgMoon size={30} />
              </Button>
            </div>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Header;
