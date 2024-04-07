import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

export default function UserHeader() {
  const toast = useToast()

  //copy URL functionality
  const copyURL = () => {
    const currentURL = window.location.href
    //console.log(window.location)
    navigator.clipboard.writeText(currentURL).then(() => {
      // chakra-ui toast functionality
      toast({
        title: 'Profile Link copied!',
        description: "Have fun😊",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <VStack gap='4' alignItems='start'>
      <Flex justifyContent='space-between' width='full'>
        <Box>
          <Text fontWeight='bold' fontSize='2xl' >
            Mark Zukerburg
          </Text>
          <Flex gap='2' alignItems='center'>
            <Text fontSize='sm'>@markzukerburg</Text>
            <Text fontSize='xs' bg='gray.dark' color='gray.light' p='1' borderRadius='full'>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zukerburg"
            src="/zuck-avatar.png"
            size='xl'
          />
        </Box>
      </Flex>

      <Text>Co-Founder, Executive Chairman and CEO of Meta platforms.</Text>

      <Flex w='full' justifyContent='space-between'>
        <Flex gap='2' alignItems='center'>
          <Text color='gray.light'>3.2k followers</Text>
          <Box w='1' h='1' bg='gray.light' borderRadius='full'></Box>
          <Link color='gray.light'>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size='24' cursor='pointer' />
          </Box>
          <Box className="icon-container">

            <Menu>
              <MenuButton>
                <CgMoreO size='24' cursor='pointer' />
              </MenuButton>
              <Portal>
                <MenuList bg='gray.dark'>
                  <MenuItem bg='gray.dark' onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w='full' >
        <Flex flex='1' borderBottom='1.5px solid white' justifyContent='center' alignItems='center' pb='3' cursor='pointer'>
          Threads
        </Flex>
        <Flex flex='1'  borderBottom='1.5px solid gray' justifyContent='center' color='gray.light' alignItems='center' pb='3' cursor='pointer'>Replies</Flex>
      </Flex>
    </VStack>
  )
}
