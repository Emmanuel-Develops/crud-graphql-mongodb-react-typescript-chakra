import { Box, Container, Heading, HStack, Image, Text } from "@chakra-ui/react";
import logo from "components/assets/GraphQL.png";

const Header = () => {
    return (
        <Box as="nav" p="0" bg="gray.100" mb="4">
            <Container maxW='container.xl'>
                <a href="/">
                    <HStack spacing={3} >
                        <Image src={logo} boxSize='60px' alt="graphql logo" ></Image>
                        <Text fontSize='lg' color='pink.500' fontWeight='600' letterSpacing="wide" >ProjectMgmt</Text>
                    </HStack>
                </a>
            </Container>
        </Box>
    );
};

export default Header;
