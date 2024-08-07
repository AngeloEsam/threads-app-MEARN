import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
const Comment = ({ reply,lastReply }) => {
  return (
    <>
      <Flex gap={4} my={2} py={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex w={"full"} gap={1} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply?<Divider />:null}
    </>
  );
};

export default Comment;
