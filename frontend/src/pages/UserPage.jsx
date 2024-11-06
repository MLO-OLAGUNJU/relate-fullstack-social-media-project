import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const UserPage = () => {
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in

  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const [activeTab, setActiveTab] = useState("relates");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);

        console.log(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setFetchingPosts(false);
      }
    };

    getUser();
    getPosts();
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
  if (!posts) return null;

  return (
    <div>
      <UserHeader
        user={user}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      {fetchingPosts && (
        <>
          <Flex justifyContent={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        </>
      )}

      {!fetchingPosts &&
        activeTab === "relates" &&
        posts.length === 0 &&
        currentUser._id === user._id && (
          <Flex justifyContent={"center"}>
            <h1 className="mt-[50px]">
              You have have not posted any Relates yet!
            </h1>
          </Flex>
        )}
      {!fetchingPosts &&
        activeTab === "relates" &&
        posts.length === 0 &&
        currentUser._id !== user._id && (
          <Flex justifyContent={"center"}>
            <h1 className="mt-[50px]">
              {currentUser.username} has not posted any Relates
            </h1>
          </Flex>
        )}

      {!fetchingPosts &&
        activeTab === "relates" &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}

      {!fetchingPosts && activeTab === "replies" && (
        <Flex justifyContent={"center"}>
          <h1 className="mt-[50px]">No Replies yet</h1>
        </Flex>
      )}
    </div>
  );
};

export default UserPage;
