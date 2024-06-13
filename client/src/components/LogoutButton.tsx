import { Button } from "@chakra-ui/react";

export default function LogoutButton() {
    const handleLogOut = async () => {

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
