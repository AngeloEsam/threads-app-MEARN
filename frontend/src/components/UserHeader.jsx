import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFollowUnFollow from "../hooks/useFollowUnFollow";

const UserHeader = ({user}) => {
  const currentUser=useRecoilValue(userAtom)
  const {handleFollowAndUnfollow,updating,following}=useFollowUnFollow(user)
  const toast = useToast();
  const copyURL = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      // toast({ description: 'Copied' })
      toast({
        title: "Copied URL.",
        description: "Profile link copied.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
           {user.name}
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic&&(
            <Avatar
            name={user.name}
            src={user.profilePic}
            size={{
              base: "md",
              md: "xl",
            }}
          />
          )}
           {!user.profilePic&&(
            <Avatar
            name={user.name}
           src='https://bit.ly/broken-link'
            size={{
              base: "md",
              md: "xl",
            }}
          />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id===user._id&&(
        <Link to={`/update`}>
        <Button size={'sm'}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id!==user._id&&(
        <Button size={"sm"} onClick={handleFollowAndUnfollow} isLoading={updating}>
        {following ? "Unfollow" : "Follow"}
      </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram cursor={"pointer"} size={24} />
          </Box>
          <Box className="icon-container">
            <Menu isLazy>
              <MenuButton>
                <CgMoreO cursor={"pointer"} size={24} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          pb={3}
          justifyContent={"center"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          color={"gray.light"}
          pb={3}
          justifyContent={"center"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
