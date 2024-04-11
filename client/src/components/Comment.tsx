import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
//import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import ActionsLogo from './ActionsLogo'

export default function Comment() {
  //const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex gap='4' py='2' my='2' w='full'>
        <Avatar src='/zuck-avatar.png' size='sm' />

        <Flex gap='1' w='full' flexDirection='column'>
          <Flex w='full' justifyContent='space-between' alignItems='center'>
            <Text fontSize='sm' fontWeight='bold'>markzuckerberg</Text>

            <Flex alignItems='center' gap='2'>
              <Text fontSize='sm' color='gray.light'>2d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text>Hey this looks great!</Text>

          <ActionsLogo  likes={3} replies={1}/>
        </Flex>
      </Flex>

      <Divider mb='3' />
    </>
  )
}
