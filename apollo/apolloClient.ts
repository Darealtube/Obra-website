import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

let apolloClient;

// Creates an HttpLink towards the website's api on https://obra-api.vercel.app.
// In order to work in dev environment, set the uri to http://localhost:4000/api/graphql.
// Before pushing to main, make sure to set it back to https://obra-api.vercel.app.

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `https://obra-api.vercel.app/api/graphql`,
      credentials: "include", // "include" because our API server is on another domain. "same-origin" if not.
      fetchOptions: {
        mode: "cors", // This should always be CORS as our API server is on another domain.
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // relayStylePagination is a kind of cursor-based pagination that uses similar syntax
            // to Relay. It uses nodes and edges in order to paginate through a list.
            // Know more: https://www.apollographql.com/docs/react/pagination/cursor-based/#relay-style-cursor-pagination
            featuredPosts: relayStylePagination(),
            posts: relayStylePagination(),
            newPosts: relayStylePagination(),
            recommendedPosts: relayStylePagination(),
          },
        },
        User: {
          fields: {
            likedPosts: relayStylePagination(),
            posts: relayStylePagination(),
            homeRecommended: relayStylePagination(),
            notifications: relayStylePagination(),
            commissions: relayStylePagination(),
            pendingCommissions: relayStylePagination(),
          },
        },
        Post: {
          fields: {
            comments: relayStylePagination(),
          },
        },
      },
    }),
  });
}

// Initializes Apollo Client. This should be used before every request backend
// such as ```await apolloClient.query. This should not be changed in any way.


export function initializeApollo(initialState = null) {
  const _apolloClient: null | ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
