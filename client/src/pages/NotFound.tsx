import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { FaExclamationTriangle } from "react-icons/fa"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Flex direction={'column'} justify='center' align='center' mt={8} gap={4}>
        <Icon as={FaExclamationTriangle} fontSize='75px' color='orange.400' />
        <Heading size='2xl'>
            404
        </Heading>
        <Text fontSize='xl' >Sorry, this page doesn't exist</Text>
        <Link to='/'>
            <Button colorScheme='purple' fontSize='lg' fontWeight={600} >
                Go Back
            </Button>
        </Link>
    </Flex>
  )
}

export default NotFound
