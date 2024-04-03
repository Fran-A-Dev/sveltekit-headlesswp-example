// src/lib/apollo-client.js

// src/lib/apollo-client.js

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Ensure you have VITE_GRAPHQL_ENDPOINT defined in your .env file
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT, // Use the environment variable here
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
