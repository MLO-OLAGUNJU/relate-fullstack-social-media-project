import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);

  // console.log(user);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return (
      <Flex justifyContent={"center"}>
        <h1>User not found!</h1>
      </Flex>
    );
  }

  if (!user) return null;

  return (
    <div>
      <UserHeader user={user} />
      <UserPost
        likes={200}
        replies={975}
        postImg="/photo-1543248939-ff40856f65d4.avif"
        postTitle="Always keep fighting..."
      />
      <UserPost likes={753} replies={889} postTitle="Hey Peeps" />
    </div>
  );
};

export default UserPage;
