import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [username]);

  return (
    <div>
      <UserHeader />
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
