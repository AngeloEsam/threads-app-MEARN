import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from './../atoms/userAtom';
import {BsCheck2All} from 'react-icons/bs'
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation,setSelectedConversation]=useRecoilState(selectedConversationAtom)
  const colorMode=useColorMode()
  //console.log("selectedConversation",selectedConversation)
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      onClick={()=>setSelectedConversation({
        _id: conversation._id,
        username: user.username,
        userProfilePic:user.profilePic,
        userId:user._id,
        mock:conversation.mock
      })}
      _hover={{
        bg: useColorModeValue("gray.600", "gray.dark"),
        cursor: "pointer",
        color: "white",
      }}
      bg={
				selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
			}

      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={conversation.participants[0].profilePic}
        >
          <AvatarBadge boxSize="1em" bg={"green.500"} />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={700} display={"flex"} alignItems={"center"}>
          {conversation.participants[0].username}
          <Image src="/verified.png" ml={1} w={4} h={4} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
        {currentUser._id === conversation.lastMessage.sender ? (
						<Box color={conversation.lastMessage.seen ? "blue.400" : ""}>
							<BsCheck2All size={16} />
						</Box>
					) : (
						""
					)}
          {conversation.lastMessage.text.length > 18
            ? conversation.lastMessage.text.slice(0, 18) + "..."
            : conversation.lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
