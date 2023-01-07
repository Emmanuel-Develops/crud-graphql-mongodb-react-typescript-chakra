import { ChakraProvider, Container } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header";

import theme from "theme";

import Home from "pages/Home";
import ProjectPage from "pages/ProjectPage";
import NotFound from "pages/NotFound";
import { envUrl } from "utils/envUrl";
import { AuthContextProvider } from "context/authContext";
import { storageService } from "auth/storageService";
import useAuth from "hooks/useAuth";

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

const httpLink = createHttpLink({
  uri: url + "/graphql",
});
// const user = storageService.getData()

// const authLink = setContext((_, { headers }) => {
//   const token = user?.token
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   uri: 'https://api.example.com',
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: localStorage.getItem('token'),
//     'client-name': 'WidgetX Ecom [web]',
//     'client-version': '1.0.0'
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })
function App() {
  const {auth} = useAuth()
  const token = auth?.token
  const client = new ApolloClient({
    uri: url + "/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
          <Router>
            <Container maxW="container.xl">
              <Header />
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
