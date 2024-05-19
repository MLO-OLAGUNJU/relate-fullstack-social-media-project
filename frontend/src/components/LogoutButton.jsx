import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const LogoutButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      //fetch
      const res = fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-relate");

      setUser(null);
      showToast("Success", data.message, "message");
    } catch (error) {
      console.log(error);
      showToast("Error", error, "error");
    }
  };

  return (
    <>
      {user && (
        <button
          className={`w-full text-start pl-5 py-4  ${
            colorMode === "dark" ? " bg-[#181818]" : "  bg-[#f9f9f9]"
          }`}
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </>
  );
};

export default LogoutButton;
