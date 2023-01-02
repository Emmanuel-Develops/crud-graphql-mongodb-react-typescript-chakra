import { Box, Container, Flex, HStack, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import logo from "components/assets/GraphQL.png";
import useAuth from "hooks/useAuth";
import useBackendAuth from "hooks/useBackendAuth";
import { Link } from "react-router-dom";
import GoogleAuthentication from "./GoogleAuthentication";
import { userAuth } from "context/authContext";

const Header = () => {
    const toast = useToast()
    const {loading, error, handleGoogle} = useBackendAuth()
    const { auth } = useAuth()

    if (error) {
        toast({
            title: `Failed to login. Try again later`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
      }

    return (
        <Box as="nav" p="0" bg="gray.100" mb="4">
            <Container maxW='container.xl'>
                <Flex justifyContent="space-between" gap={3} alignItems="center" >
                    <Box w="max-content">
                        <Link to="/" >
                            <HStack spacing={3} >
                                <Image src={logo} boxSize='60px' alt="graphql logo" ></Image>
                                <Text fontSize='lg' color='pink.500' fontWeight='600' letterSpacing="wide" >ProjectMgmt</Text>
                            </HStack>
                        </Link>
                    </Box>
                    {loading ? <Spinner/> :
                    auth.token ? <UserProfile user={auth} /> :
                    <GoogleAuthentication handleGoogle={handleGoogle} />
                    }
                </Flex>
            </Container>
        </Box>
    );
};

const UserProfile = ({user}: {user: userAuth}) => {
    return (
        <Box p={{base: "4px", md: "6px"}}>
            <Flex gap={4}>
                <Image src={user?.picture ? user.picture : ""} />
                <Text fontSize="clamp(1rem, 0.5vw, 2rem)" fontWeight="bold">`${user.firstName || ""} ${user.lastName || ""}`</Text>
            </Flex>
        </Box>
    )
}

export default Header;
