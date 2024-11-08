import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useLocation, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import postAtom from "../atoms/postAtom";

const UserPage = () => {
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in
  const { user, loading } = useGetUserProfile();
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split("/");
  const username = parts[1];

  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const [activeTab, setActiveTab] = useState("relates");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);

      try {
        const res = await fetch(`/api/posts/user/${username}`);

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        console.log(data);

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setPosts, user]);

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
