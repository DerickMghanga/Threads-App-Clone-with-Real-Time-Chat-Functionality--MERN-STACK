import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <Link to={"/markzuckerberg"}>
           <Flex>
            <Button>Visit Profile</Button>
            </Flex>
        </Link>
    )
}
