import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "components/Header";
import Clients from "components/Clients";

import theme from "theme";
import AddClientModal from "components/AddClientModal";

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         clients: {
//           merge(existing, incoming) {
//             return incoming;
//           }
//         },
//         projects: {
//           merge(existing, incoming) {
//             return incoming;
//           }
//         }
//       }
//     }
//   }
// })

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Header />
        <Container maxW="container.xl">
          <AddClientModal />
          <Clients/>
        </Container>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
