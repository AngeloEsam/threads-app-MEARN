import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import Comment from "../components/Comment";
import postsAtom from "../atoms/PAtom";
const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const navigate = useNavigate();
  const currentPost=posts[0]
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid,setPosts]);
  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user) {
    return (
      <Flex justifyContent={"center"}>
        <Text>User not found</Text>
      </Flex>
    );
  }
  if (!currentPost) return null;

  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Flex gap={3} alignItems={"center"} w={"full"}>
          <Avatar name="Mark Zukerberg" src={user?.profilePic} size={"md"} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user?.username}
            </Text>
            <Image w={4} h={4} src="/verified.png" ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon size={20} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>
      <Text my={3}>{currentPost.text}.</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋 </Text>
          <Text color={"gray.light"}>
            Get the app to like, reply and posts.
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment key={reply._id} reply={reply}
        lastReply={reply._id===currentPost.replies[currentPost.replies.length-1]._id}
         />
      ))}
    </>
  );
};

export default PostPage;
