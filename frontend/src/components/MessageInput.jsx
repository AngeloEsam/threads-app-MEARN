import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { useState } from "react";
const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const setConversations = useSetRecoilState(conversationsAtom);
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    try {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error sending message", data.error, "error");
        return;
      }

      setMessages((messages) => [...messages, data]);
      setConversations((prevConv) => {
        const updatedConv = prevConv.map((conv) => {
          if (conv._id === selectedConversation._id) {
            return {
              ...conv,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conv;
        });
        return updatedConv;
      });
      setMessageText("");
    } catch (error) {
      showToast("Error fetching messages", error.message, "error");
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <InputRightElement cursor={"pointer"} onClick={handleSendMessage}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
