import React from "react";
import useShowToast from "./useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const logout = async () => {
    try {
      //fetch
      const res = await fetch("/api/users/logout", {
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
    } catch (error) {
      console.log(error);
      showToast("Error", error, "error");
    }
  };

  return logout;
};

export default useLogout;
