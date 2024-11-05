import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";

const HomePage = () => {
  const showToast = useShowToast(); // Assuming showToast is a custom hook for showing toast notifications
  const [posts, SetPosts] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const getFeedsPost = async () => {
      // SetLoading(true);
      try {
        const res = await fetch(`/api/posts/feed`);

        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        console.log(data);

        SetPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        SetLoading(false);
      }
    };

    getFeedsPost();
  }, [showToast]);

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
