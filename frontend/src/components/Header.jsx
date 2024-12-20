import React, { useState, useEffect } from "react";
import { Flex, Image, Button, useColorMode, Box } from "@chakra-ui/react";
import { CgClose, CgMenuRight, CgMoon, CgSun } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authScreenAtom from "../atoms/authAtom";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userAtom);
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in

  const logout = useLogout();

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
      {isOpen && (
        <Box
          onClick={handleClick}
          backdropFilter="auto"
          position={"fixed"}
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={40}
          backdropBlur="5px"
        />
      )}
      <Flex
        position={"relative"}
        justifyContent={"space-between"}
        mt={6}
        mb={{
          base: 0,
          md: 12,
        }}
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
            {user ? (
              <>
                <Link to={"/"} className="w-full">
                  <button
                    className={`w-full text-start pl-5 py-4  ${
                      colorMode === "dark"
                        ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                        : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
                    }`}
                    onClick={handleClick}
                  >
                    Go to Feeds
                  </button>
                </Link>
                <Link to={currentUser.username} className="w-full">
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
                <Link to={currentUser.username} className="w-full">
                  <button
                    className={`w-full text-start pl-5 py-4  ${
                      colorMode === "dark"
                        ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                        : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
                    }`}
                    onClick={handleClick}
                  >
                    Notifcations
                  </button>
                </Link>
                <Link to={"/chat"} className="w-full">
                  <button
                    className={`w-full text-start pl-5 py-4  ${
                      colorMode === "dark"
                        ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                        : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
                    }`}
                    onClick={handleClick}
                  >
                    Messages
                  </button>
                </Link>
              </>
            ) : (
              <Link
                to={"/auth"}
                className="w-full"
                onClick={() => setAuthScreenState("login")}
              >
                <button
                  className={`w-[100%] text-start pl-5 py-4  ${
                    colorMode === "dark"
                      ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                      : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
                  }`}
                  onClick={handleClick}
                >
                  Login
                </button>
              </Link>
            )}
            {user && (
              <Link to={"/update"} className="w-full">
                <button
                  className={`w-full text-start pl-5 py-4  ${
                    colorMode === "dark"
                      ? " border-b-[#272727] border-b-[1px] border-solid bg-[#181818]"
                      : " border-b-[#e8e8e8]  border-b-[1px] border-solid bg-[#f9f9f9]"
                  }`}
                  onClick={handleClick}
                >
                  Settings
                </button>{" "}
              </Link>
            )}
            {/*  */}{" "}
            {user ? (
              <div className="w-full" onClick={handleClick}>
                <button
                  className={`w-full text-start pl-5 py-4  ${
                    colorMode === "dark" ? " bg-[#181818]" : "  bg-[#f9f9f9]"
                  }`}
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to={"/auth"}
                className="w-full"
                onClick={() => setAuthScreenState("signup")}
              >
                <button
                  className={`w-full text-start pl-5 py-4  ${
                    colorMode === "dark" ? " bg-[#181818]" : " bg-[#f9f9f9]"
                  }`}
                  onClick={handleClick}
                >
                  Create account
                </button>
              </Link>
            )}
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
