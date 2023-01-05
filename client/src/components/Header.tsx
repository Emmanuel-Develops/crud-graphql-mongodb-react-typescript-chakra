import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import logo from "components/assets/GraphQL.png";
import useAuth from "hooks/useAuth";
import useBackendAuth from "hooks/useBackendAuth";
import { Link } from "react-router-dom";
import GoogleAuthentication from "./GoogleAuthentication";
import UserProfile from "./UserProfile";

const Header = () => {
  const toast = useToast();
  const { loading, error, handleGoogle } = useBackendAuth();
  const { auth, clearAuth } = useAuth();

  if (error.state) {
    toast({
      title: `Failed to login. Try again later`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box as="nav" py="2" bg="gray.100" mb="4">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" gap={3} alignItems="center">
          <Box w="max-content">
            <Link to="/">
              <HStack spacing={3}>
                <Image src={logo} boxSize="60px" alt="graphql logo"></Image>
                <Text
                  fontSize="lg"
                  color="pink.500"
                  fontWeight="600"
                  letterSpacing="wide"
                >
                  ProjectMgmt
                </Text>
              </HStack>
            </Link>
          </Box>
          {loading ? (
            <Spinner />
          ) : auth.token ? (
            <UserProfile user={auth} onLogout={clearAuth} />
          ) : (
            <GoogleAuthentication handleGoogle={handleGoogle} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
