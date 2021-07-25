import { initializeApollo } from "../apollo/apolloClient";
import {
  ALL_USER_QUERY,
  BUG_REPORTS_QUERY,
  CART_QUERY,
  FEATURED_POSTS_QUERY,
  HOME_RECOMMENDED_QUERY,
  IS_ADMIN,
  IS_LIKED_ARTIST,
  IS_LIKED_OR_ADDED_POST,
  IS_SAME_USER,
  NEW_POSTS_QUERY,
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
  REPORTED_COMMENTS_QUERY,
  REPORTED_POSTS_QUERY,
  REPORT_ID_QUERY,
  USER_ID_QUERY,
  USER_LIKED_POST_QUERY,
  USER_POST_QUERY,
  YOUR_FINISHED_COMMS_QUERY,
} from "../apollo/apolloQueries";
import {
  FeaturedPostsData,
  NewPostsData,
  PaginatedPostsVars,
  PostData,
  RecommendedPostData,
  UserData,
  HomeUserData,
  UserIdData,
  QueryNameVars,
  QueryIdVars,
  isLikedorAddedData,
  isLikedorAddedVars,
  ReportData,
  ReportVars,
  ReportIdData,
  ReportIdVars,
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
  } = await apolloClient.query<UserData, QueryNameVars>({
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
  } = await apolloClient.query<UserData, QueryNameVars>({
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
    await apolloClient.query<HomeUserData, QueryIdVars>({
      query: HOME_RECOMMENDED_QUERY,
      variables: {
        id: id,
        limit: 4,
      },
    });
  }
  return apolloClient;
};

export const InitializePostInfo = async (id: string, sessionId: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { postId },
  } = await apolloClient.query<PostData, QueryIdVars>({
    query: POST_ID_QUERY,
    variables: {
      id: id,
      limit: 4,
    },
  });

  if (postId) {
    await apolloClient.query<RecommendedPostData, QueryIdVars>({
      query: POST_RECOMMENDED_QUERY,
      variables: {
        id: id,
        limit: 4,
      },
    });
  }

  const {
    data: { isLikedorAddedPost },
  } = await apolloClient.query<isLikedorAddedData, isLikedorAddedVars>({
    query: IS_LIKED_OR_ADDED_POST,
    variables: {
      postID: id,
      userID: sessionId,
    },
  });

  return {
    data: apolloClient,
    exists: postId ? true : false,
    alreadyLiked: isLikedorAddedPost.isLiked as boolean,
    alreadyAdded: isLikedorAddedPost.isAdded as boolean,
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

export const fetchPostReports = async (id: string) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<ReportData, ReportVars>({
    query: REPORTED_POSTS_QUERY,
    variables: {
      limit: 4,
    },
  });

  const {
    data: { isAdmin },
  } = await apolloClient.query({
    query: IS_ADMIN,
    variables: {
      id: id,
    },
  });

  return { data: apolloClient, isAdmin };
};

export const fetchCommentReports = async (id: string) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<ReportData, ReportVars>({
    query: REPORTED_COMMENTS_QUERY,
    variables: {
      limit: 4,
    },
  });

  const {
    data: { isAdmin },
  } = await apolloClient.query({
    query: IS_ADMIN,
    variables: {
      id: id,
    },
  });

  return { data: apolloClient, isAdmin };
};

export const fetchBugReports = async (id: string) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<ReportData, ReportVars>({
    query: BUG_REPORTS_QUERY,
    variables: {
      limit: 4,
    },
  });

  const {
    data: { isAdmin },
  } = await apolloClient.query({
    query: IS_ADMIN,
    variables: {
      id: id,
    },
  });

  return { data: apolloClient, isAdmin };
};

export const fetchReportId = async (id: string, reportedId: string) => {
  const apolloClient = initializeApollo();

  const {
    data: { reportId },
  } = await apolloClient.query<ReportIdData, ReportIdVars>({
    query: REPORT_ID_QUERY,
    variables: {
      reportedId: reportedId,
    },
  });

  const {
    data: { isAdmin },
  } = await apolloClient.query({
    query: IS_ADMIN,
    variables: {
      id: id,
    },
  });

  return { data: apolloClient, exists: reportId ? true : false, isAdmin };
};

export const fetchCart = async (sessionId: string) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<UserIdData, QueryIdVars>({
    query: CART_QUERY,
    variables: {
      id: sessionId,
      limit: 4,
    },
  });

  return apolloClient;
};

export const fetchFinishedComms = async (sessionId: string) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<UserIdData, QueryIdVars>({
    query: YOUR_FINISHED_COMMS_QUERY,
    variables: {
      id: sessionId,
      limit: 4,
    },
  });

  return apolloClient;
};
