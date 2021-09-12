import { initializeApollo } from "../apollo/apolloClient";
import {
  POPULAR_CATEGORIES_QUERY,
  CATEGORY_POSTS_QUERY,
} from "../apollo/Queries/categoryQueries";
import {
  TRENDING_POSTS_QUERY,
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
} from "../apollo/Queries/postQueries";
import {
  REPORTED_POSTS_QUERY,
  REPORTED_COMMENTS_QUERY,
  BUG_REPORTS_QUERY,
  REPORT_ID_QUERY,
} from "../apollo/Queries/reportQueries";
import {
  USER_POST_QUERY,
  USER_LIKED_POST_QUERY,
} from "../apollo/Queries/userQueries";
import { IS_LIKED_POST, IS_ADMIN } from "../apollo/Queries/validateQueries";
import {
  PostData,
  RecommendedPostData,
  UserData,
  QueryNameVars,
  QueryIdVars,
  ReportData,
  ReportVars,
  ReportIdData,
  ReportIdVars,
  isLikedData,
  isLikedVars,
  PopularCategoriesData,
  TrendingPostsData,
  PaginatedPostsVars,
  CategoryPostsData,
  CategoryPostsVars,
} from "../interfaces/QueryInterfaces";

/* These are the fetch functions that are used on pages that have
 getServerSideProps/getStaticProps. In every fetch function, it
 should return apolloClient (primarily), as it is passed in
 each getServerSideProps/getStaticProps addApolloState function
 found from the apolloClient file. This is in order to add the 
 data into the cache. Other information could be passed as well. */

export const fetchUserandPosts = async (name: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userName },
  } = await apolloClient.query<UserData, QueryNameVars>({
    query: USER_POST_QUERY,
    variables: {
      name: name,
      limit: 20,
    },
  });

  return {
    data: apolloClient,
    exists: userName ? true : false,
  };
};

export const fetchUserandLikedPosts = async (name: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userName },
  } = await apolloClient.query<UserData, QueryNameVars>({
    query: USER_LIKED_POST_QUERY,
    variables: {
      name: name,
      limit: 20,
    },
  });

  return {
    data: apolloClient,
    exists: userName ? true : false,
  };
};

export const fetchHomeCategories = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query<PopularCategoriesData>({
    query: POPULAR_CATEGORIES_QUERY,
  });
  return apolloClient;
};

export const fetchTrending = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query<TrendingPostsData, PaginatedPostsVars>({
    query: TRENDING_POSTS_QUERY,
    variables: {
      limit: 20,
    },
  });
  return apolloClient;
};

export const fetchPopularCategories = async () => {
  const apolloClient = initializeApollo();
  const {
    data: { popularCategories },
  } = await apolloClient.query<PopularCategoriesData>({
    query: POPULAR_CATEGORIES_QUERY,
  });
  const categories = popularCategories.map((category) => category.name);
  return categories;
};

export const fetchCategoryPosts = async (category: string) => {
  const apolloClient = initializeApollo();
  await apolloClient.query<CategoryPostsData, CategoryPostsVars>({
    query: CATEGORY_POSTS_QUERY,
    variables: {
      category,
      limit: 20,
    },
  });

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
        limit: 20,
      },
    });
  }

  const {
    data: { isLikedPost },
  } = await apolloClient.query<isLikedData, isLikedVars>({
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
