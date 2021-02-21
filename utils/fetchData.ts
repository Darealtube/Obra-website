import dbConnect from "./dbConnect";
import Post from "../model/Post";
import { initializeApollo } from "../apollo/apolloClient";
import {
  POST_ID_QUERY,
  POST_QUERY,
  USER_ID_QUERY,
  USER_POST_QUERY,
} from "../apollo/apolloQueries";

export const fetchUser = async (id: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_ID_QUERY,
    variables: {
      id: id,
    },
  });
  if (!data) {
    return null;
  }
  return data.userId;
};

/* export const fetchUserPosts = async (name: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_ID_QUERY,
    variables: {
      name: name,
    },
  });
  if (!data) {
    return null;
  }
  return data.userId;
}; */

export const fetchUserandPosts = async (name: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_POST_QUERY,
    variables: {
      name: name,
    },
  });

  return { data: apolloClient.cache.extract(), exists: data ? true : false };
};

export const fetchPosts = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: POST_QUERY,
  });
  return apolloClient.cache.extract();
};

export const fetchAPost = async (id: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: POST_ID_QUERY,
    variables: {
      id: id,
    },
  });
  if (!data) {
    return null;
  }
  return data.postId;
};

export const InitializePostInfo = async (id: string, sessionId: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: POST_ID_QUERY,
    variables: {
      id: id,
    },
  });
  await apolloClient.query({
    query: POST_QUERY,
  });
  const { data: user } = await apolloClient.query({
    query: USER_ID_QUERY,
    variables: {
      id: sessionId,
    },
  });

  return {
    data: apolloClient.cache.extract(),
    exists: data ? true : false,
    alreadyLiked: user.userId.likedPosts.some((post) => post.id === id),
  };
};
