import { MenuItem } from "@chakra-ui/react";
import React from "react";
import useFollowToggle from "../hooks/useFollowToggle";

const FollowMenu = ({ user }) => {
  const [following, handleFolloworUnfollow, updating] = useFollowToggle(user);

  return (
    <>
      <MenuItem
        _light={{
          bg: "gray.light",
          // color: "#fff",
        }}
        bg={"gray.dark"}
        // onClick={copyUrl}
        color={"red"}
      >
        Report Relate
      </MenuItem>
      <MenuItem
        _light={{
          bg: "gray.light",
          // color: "#fff",
        }}
        bg={"gray.dark"}
        onClick={handleFolloworUnfollow}
        // color={"red"}
      >
        {following ? `Unfollow ${user.username}` : `Follow  ${user.username}`}
      </MenuItem>
    </>
  );
};

export default FollowMenu;
