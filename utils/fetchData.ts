import { initializeApollo } from "../apollo/apolloClient";
import {
  FEATURED_POSTS_QUERY,
  IS_LIKED_ARTIST,
  IS_LIKED_POST,
  NEW_POSTS_QUERY,
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
  USER_ID_QUERY,
  USER_LIKED_POST_QUERY,
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

export const fetchUserandPosts = async (name: string, userID: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_POST_QUERY,
    variables: {
      name: name,
    },
  });
  const {
    data: { isLikedArtist },
  } = await apolloClient.query({
    query: IS_LIKED_ARTIST,
    variables: {
      userID: userID,
      artistName: name,
    },
  });

  return {
    data: apolloClient.cache.extract(),
    exists: data ? true : false,
    alreadyLiked: isLikedArtist,
  };
};

export const fetchUserandLikedPosts = async (name: string, userID: string) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_LIKED_POST_QUERY,
    variables: {
      name: name,
    },
  });

  const {
    data: { isLikedArtist },
  } = await apolloClient.query({
    query: IS_LIKED_ARTIST,
    variables: {
      userID: userID,
      artistName: name,
    },
  });

  return {
    data: apolloClient.cache.extract(),
    exists: data ? true : false,
    alreadyLiked: isLikedArtist,
  };
};

export const fetchPosts = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: FEATURED_POSTS_QUERY,
  });
  await apolloClient.query({
    query: NEW_POSTS_QUERY,
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
    query: POST_RECOMMENDED_QUERY,
    variables: {
      id: id,
    },
  });
  const {
    data: { isLikedPost },
  } = await apolloClient.query({
    query: IS_LIKED_POST,
    variables: {
      postID: id,
      userID: sessionId,
    },
  });

  return {
    data: apolloClient.cache.extract(),
    exists: data ? true : false,
    alreadyLiked: isLikedPost,
  };
};
