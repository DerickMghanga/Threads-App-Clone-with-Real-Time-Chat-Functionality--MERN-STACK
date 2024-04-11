import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from 'react-icons/bs'
import ActionsLogo from "./ActionsLogo";

interface userPost {
    postImg?: string
    postTitle: string
    likes: number
    replies: number
}

export default function UserPost({ postImg, postTitle, likes, replies }: userPost) {
    return (
        <Link to={`/markzukerburg/post/1`}>
            <Flex gap='3' mb='4' py='5'>
                <Flex flexDirection='column' alignItems='center'>
                    <Avatar
                        size='md'
                        name='Mark Zukerburg'
                        src="/zuck-avatar.png"
                    />
                    <Box w='1px' h='full' bg='gray.light' my='2'></Box>
                    <Box position='relative' width='full'>
                        <Avatar
                            size='xs'
                            name='John Doe'
                            src='https://bit.ly/dan-abramov'
                            position='absolute'
                            top='0px'
                            left='15px'
                            padding='2px'
                        />
                        <Avatar
                            size='xs'
                            name='John Doe'
                            src='https://bit.ly/kent-c-dodds'
                            position='absolute'
                            bottom='0px'
                            right='-5px'
                            padding='2px'
                        />
                        <Avatar
                            size='xs'
                            name='John Doe'
                            src='https://bit.ly/code-beast'
                            position='absolute'
                            bottom='0px'
                            left='4px'
                            padding='2px'
                        />
                    </Box>
                </Flex>

                <Flex flex='1' flexDirection='column' gap='2'>
                    <Flex justifyContent='space-between'>
                        <Flex w='full' alignItems='center' gap='1'>
                            <Text fontSize='sm' fontWeight='bold'>markzukerburg</Text>
                            <Image src="/verified.png" w='4' h='4' />
                        </Flex>

                        <Flex gap='4' alignItems='center'>
                            <Text fontSize='sm' color='gray.light'>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>

                    <Text fontSize='sm'>{postTitle}</Text>

                    {
                        postImg && (
                            <Box overflow='hidden' borderRadius='6' border='1px solid' borderColor='gray.light'>
                                <Image src={postImg} w='full' />
                            </Box>
                        )
                    }


                    <ActionsLogo likes={likes} replies={replies} />
                </Flex>
            </Flex>

        </Link>
    )
}
