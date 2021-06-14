import { initializeApollo } from "../apollo/apolloClient";
import {
  ALL_POST_QUERY,
  ALL_USER_QUERY,
  FEATURED_POSTS_QUERY,
  HOME_RECOMMENDED_QUERY,
  IS_LIKED_ARTIST,
  IS_LIKED_POST,
  IS_SAME_USER,
  NEW_POSTS_QUERY,
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
  REPORT_POST_QUERY,
  USER_ID_QUERY,
  USER_LIKED_POST_QUERY,
  USER_POST_QUERY,
} from "../apollo/apolloQueries";
import {
  FeaturedPostsData,
  NewPostsData,
  PaginatedPostsVars,
  PostData,
  PostVars,
  RecommendedPostData,
  UserData,
  UserVars,
  HomeUserData,
  HomeUserVars,
} from "../interfaces/QueryInterfaces";

/* These are the fetch functions that are used on pages that have
 getServerSideProps/getStaticProps. In every fetch function, it
 should return apolloClient (primarily), as it is passed in
 each getServerSideProps/getStaticProps addApolloState function
 found from the apolloClient file. This is in order to add the 
 data into the cache. Other information could be passed as well. */

export const fetchUser = async (id: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userId },
  } = await apolloClient.query({
    query: USER_ID_QUERY,
    variables: {
      id: id,
    },
  });
  if (!userId) {
    return null;
  }
  return userId;
};

export const isSameUser = async (id: string, name: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { isSameUser },
  } = await apolloClient.query({
    query: IS_SAME_USER,
    variables: {
      userId: id,
      userName: name,
    },
  });

  return { data: apolloClient, same: isSameUser };
};

export const fetchUserandPosts = async (name: string, userID: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userName },
  } = await apolloClient.query<UserData, UserVars>({
    query: USER_POST_QUERY,
    variables: {
      name: name,
      limit: 4,
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
    data: apolloClient,
    exists: userName ? true : false,
    alreadyLiked: isLikedArtist,
  };
};

export const fetchUserandLikedPosts = async (name: string, userID: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userName },
  } = await apolloClient.query<UserData, UserVars>({
    query: USER_LIKED_POST_QUERY,
    variables: {
      name: name,
      limit: 4,
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
    data: apolloClient,
    exists: userName ? true : false,
    alreadyLiked: isLikedArtist,
  };
};

export const fetchPosts = async (id: string) => {
  const apolloClient = initializeApollo();
  await apolloClient.query<FeaturedPostsData, PaginatedPostsVars>({
    query: FEATURED_POSTS_QUERY,
    variables: {
      limit: 4,
    },
  });
  await apolloClient.query<NewPostsData, PaginatedPostsVars>({
    query: NEW_POSTS_QUERY,
    variables: {
      limit: 4,
    },
  });

  if (id) {
    await apolloClient.query<HomeUserData, HomeUserVars>({
      query: HOME_RECOMMENDED_QUERY,
      variables: {
        id: id,
        limit: 4,
      },
    });
  }
  return apolloClient;
};

export const fetchAPost = async (id: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { postId },
  } = await apolloClient.query<PostData, PostVars>({
    query: POST_ID_QUERY,
    variables: {
      id: id,
      limit: 4,
    },
  });
  if (!postId) {
    return null;
  }
  return postId;
};

export const InitializePostInfo = async (id: string, sessionId: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { postId },
  } = await apolloClient.query<PostData, PostVars>({
    query: POST_ID_QUERY,
    variables: {
      id: id,
      limit: 4,
    },
  });
  await apolloClient.query<RecommendedPostData, PostVars>({
    query: POST_RECOMMENDED_QUERY,
    variables: {
      id: id,
      limit: 4,
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
    data: apolloClient,
    exists: postId ? true : false,
    alreadyLiked: isLikedPost,
  };
};

export const fetchAllUsers = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { allUsersList },
  } = await apolloClient.query({
    query: ALL_USER_QUERY,
  });

  return allUsersList as string[];
};

export const fetchAllPosts = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { allPostList },
  } = await apolloClient.query({
    query: ALL_POST_QUERY,
  });

  return allPostList as string[];
};

export const fetchReportedPost = async(id) => {
  const apolloClient = initializeApollo();

  const {
    data: { postId },
  } = await apolloClient.query<PostData, PostVars>({
    query: REPORT_POST_QUERY,
    variables: {
      id: id,
    },
  });

  return {
    data: apolloClient,
    exists: postId ? true : false,
  };
}