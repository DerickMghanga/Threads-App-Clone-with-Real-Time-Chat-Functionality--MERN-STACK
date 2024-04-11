import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from 'react-icons/bs'
import ActionsLogo from "../components/ActionsLogo";
import Comment from "../components/Comment";

export default function PostPage() {
  return (
    <>
      <Flex>
        <Flex w='full' alignItems='center' gap='3'>
          <Avatar
            src="/zuck-avatar.png"
            size='md'
            name="Mark Zuckerburg"
          />
          <Flex alignItems='center'>
            <Text fontSize='sm' fontWeight='bold' >markzuckerburg</Text>
            <Image src='/verified.png' w='4' h='4' ml='1' />
          </Flex>
        </Flex>

        <Flex alignItems='center' gap='4'>
          <Text fontSize='sm' color='gray.light'>1d</Text>
          <BsThreeDots cursor='pointer' />
        </Flex>
      </Flex>

      <Text my='3'>Lets talk about Threads.</Text>

      <Box overflow='hidden' borderRadius='6' border='1px solid' borderColor='gray.light'>
        <Image src='/post1.png' w='full' />
      </Box>

      <Flex gap='3' my='3'>
        <ActionsLogo likes={200} replies={28} />
      </Flex>

      <Divider my='4' />

      <Flex justifyContent='space-between'>
        <Flex gap='2' alignItems='center'>
          <Text fontSize='2xl'>👋</Text>
          <Text color='gray.light'>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my='4' />

      <Comment/>
    </>
  )
}
