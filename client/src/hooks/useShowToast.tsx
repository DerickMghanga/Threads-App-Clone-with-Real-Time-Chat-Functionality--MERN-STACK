import { useToast } from "@chakra-ui/react"

export default function useShowToast() {

  const toast = useToast()

  const showToast = (title: string, description: string, status: 'error' | 'success' | 'info') => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true
    })
  }

  return showToast
}
