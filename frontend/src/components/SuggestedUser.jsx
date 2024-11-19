import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowToggle from "../hooks/useFollowToggle";

const SuggestedUser = ({ user }) => {
  const [following, handleFolloworUnfollow, updating] = useFollowToggle(user);
  const truncateText = (text, maxLength = 10, truncateLength = 14) => {
    return text.length > maxLength
      ? `${text.substring(0, truncateLength)}...`
      : text;
  };
  return (
    <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
      {/* left side */}
      <Flex gap={2} as={Link} to={`${user.username}`}>
        <Avatar src={user.profilePic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Text color={"gray.light"} fontSize={"sm"}>
            {truncateText(user.name)}
          </Text>
        </Box>
      </Flex>
      {/* right side */}
      <Button onClick={handleFolloworUnfollow} isLoading={updating} size={"sm"}>
        {following ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
