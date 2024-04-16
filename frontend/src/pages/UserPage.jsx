import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
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
