import { ChakraProvider, Container } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header";

import theme from "theme";

import Home from "pages/Home";
import ProjectPage from "pages/ProjectPage";
import NotFound from "pages/NotFound";

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
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache(),
})
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
