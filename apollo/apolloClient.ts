import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

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
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// This is to add the cache of every server's request on the cache found
// in Apollo Client. In every page that uses getStaticProps or getServerSideProps,
// the "apolloClient" should be passed as first parameter, then page props.

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

// It memoizes the apolloClient in order for it not to repeat everytime a
// user navigates on another page.

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
