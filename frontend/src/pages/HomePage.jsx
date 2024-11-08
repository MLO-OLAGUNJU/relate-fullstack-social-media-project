import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

const HomePage = () => {
  const showToast = useShowToast(); // Assuming showToast is a custom hook for showing toast notifications
  const [posts, setPosts] = useRecoilState(postAtom);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const getFeedsPost = async () => {
      SetLoading(true);
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/feed`);

        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        SetLoading(false);
      }
    };

    getFeedsPost();
  }, [showToast, setPosts]);

  return (
    <>
      {loading && (
        <>
          <Flex justifyContent={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        </>
      )}

      {!loading && posts.length === 0 && (
        <Flex justifyContent={"center"}>
          <h1>Follow some users to see the feed</h1>{" "}
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
