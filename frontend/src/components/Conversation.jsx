import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";

const Conversation = () => {
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        bg: useColorModeValue("gray.600", "gray.dark"),
        cursor: "pointer",
        color: "white",
      }}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm:'sm',
            md: "md",
          }}
          src="https://bit.1y/borken-link"
        >
          <AvatarBadge boxSize="1em" bg={"green.500"} />
        </Avatar>
      </WrapItem>
      <Stack direction={'column'} fontSize={'sm'}>
        <Text fontWeight={700} display={'flex'} alignItems={'center'}>
            johndeo <Image src="/verified.png" ml={1} w={4} h={4}/>
        </Text>
        <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
            Hello some message...
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
