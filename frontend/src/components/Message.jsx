import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex alignSelf="flex-end" gap={2}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={user.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2} alignSelf={"flex-start"}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"gray.dark"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
