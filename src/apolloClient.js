import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_ENDPOINT, GRAPHQL_HEADERS } from './config/graphql';
import keycloak from './keycloak';

// Create HTTP link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Create auth link that adds the Keycloak token and custom headers to requests
const authLink = setContext((_, { headers }) => {
  // Get the token from Keycloak
  const token = keycloak.token;
  
  return {
    headers: {
      ...headers,
      // Add Authorization header with Keycloak token
      authorization: token ? `Bearer ${token}` : '',
      // Add custom headers from config
      ...GRAPHQL_HEADERS,
    },
  };
});

// Create Apollo Client instance
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;

