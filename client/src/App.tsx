import { ChakraProvider, Container } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header";

import theme from "theme";

import Home from "pages/Home";
import ProjectPage from "pages/ProjectPage";
import NotFound from "pages/NotFound";
import { envUrl } from "utils/envUrl";
import { AuthContextProvider } from "context/authContext";

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

const url = envUrl()

const client = new ApolloClient({
  uri:  url + "/graphql",
  cache: new InMemoryCache(),
})
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <Router>
            <Header />
            <Container maxW="container.xl">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='project/:id' element={<ProjectPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </Router>
        </AuthContextProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
