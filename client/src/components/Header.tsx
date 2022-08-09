import { Box, Container, Heading, HStack, Image, Text } from "@chakra-ui/react";
import logo from "components/assets/GraphQL.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box as="nav" p="0" bg="gray.100" mb="4">
            <Container maxW='container.xl'>
                <Box w="max-content">
                    <Link to="/" >
                        <HStack spacing={3} >
                            <Image src={logo} boxSize='60px' alt="graphql logo" ></Image>
                            <Text fontSize='lg' color='pink.500' fontWeight='600' letterSpacing="wide" >ProjectMgmt</Text>
                        </HStack>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
