import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: null | ApolloClient<NormalizedCacheObject>;

// Creates an HttpLink towards the website's api on https://obra-api.vercel.app/api/graphql.
// In order to work in dev environment, set the uri to http://localhost:4000/api/graphql.
// Before pushing to main, make sure to set it back to https://obra-api.vercel.app/api/graphql.

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
            /*
            relayStylePagination is a kind of cursor-based pagination that uses similar syntax
             to Relay. It uses nodes and edges in order to paginate through a list. DO NOT FORGET TO
             SET A NEW FIELD HERE IF THERE IS AN ADDED QUERY THAT RETURNS EDGES OR USES RELAY STYLE PAGINATION.
             If there is a problem such as that a query is not paginating, you probably haven't set that field here with
             a 'relayStylePagination()' function.
             Know more: https://www.apollographql.com/docs/react/pagination/cursor-based/#relay-style-cursor-pagination 
          */
            reports: relayStylePagination(),
            featuredPosts: relayStylePagination(),
            posts: relayStylePagination(),
            newPosts: relayStylePagination(),
            recommendedPosts: relayStylePagination(),
            /* 
              Whenever you are using relayStylePagination and you need to use other variables to paginate,
              like for example this search query here; You need to pass the extra "keys" that is required to
              paginate or for the query to execute at all. The search query not only returns a new value when
              a user types a new "key", but it also paginates on a specific key. In these situations, we need
              to add other keys in the relayStylePagination parameter. 
              Know more: https://www.apollographql.com/docs/react/pagination/cursor-based/#relay-style-cursor-pagination
            */
            search: relayStylePagination(["key", "type"]),
            categoryPosts: relayStylePagination(),
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
            yourCommissions: relayStylePagination(),
            yourPendingCommissions: relayStylePagination(),
            yourFinishedCommissions: relayStylePagination(),
            cart: relayStylePagination(),
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
