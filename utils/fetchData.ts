import dbConnect from "./dbConnect";
import Post from "../model/Post";
import { initializeApollo } from "../apollo/apolloClient";
import {
  POST_ID_QUERY,
  POST_QUERY,
  USER_ID_QUERY,
  USER_POST_QUERY,
} from "../apollo/apolloQueries";

export const fetchUser = async (name: string) => {
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
  if (!data) {
    return null;
  }
  return data.userId;
};

export const fetchPosts = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: POST_QUERY,
  });
  if (!data) {
    return null;
  }
  return data.posts;
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
