import { Button, useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

export default function LogoutButton() {

    const toast = useToast()

    const setUser = useSetRecoilState(userAtom)

    const handleLogOut = async () => {
        try {
            //fetch
            const res = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data)

            if (data.error) {
                toast({
                    title: "Error",
                    description: "LogOut failed",
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
                return
            }

            localStorage.removeItem('user-threads')
            setUser(null)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button
            position={'fixed'}
            top={'30px'}
            right={'30px'}
            size={'sm'}
            onClick={handleLogOut}
        >
            Logout
        </Button>
    )
}
