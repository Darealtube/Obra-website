import { gql } from "@apollo/client";
import { PostInfo, UserInfo } from "../fragments";

export const COMMENT_ID_QUERY = gql`
  query CommentID($id: ID!) {
    commentId(id: $id) {
      id
      author {
        id
        name
        image
        email
      }
      content
      date
      postID
    }
  }
`;

export const POST_ID_QUERY = gql`
  query PostID($id: ID!, $after: String, $limit: Int) {
    postId(id: $id) {
      id
      title
      author {
        id
        name
        image
        artCount
      }
      date
      likes
      tags {
        name
      }
      description
      watermarkArt
      comments(after: $after, limit: $limit) {
        totalCount
        edges {
          node {
            id
            author {
              id
              image
              name
            }
            date
            content
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const POST_RECOMMENDED_QUERY = gql`
  query RecommendedPosts($id: ID!, $after: String, $limit: Int) {
    recommendedPosts(id: $id, limit: $limit, after: $after) {
      edges {
        node {
          ...PostInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${PostInfo}
`;

export const TRENDING_POSTS_QUERY = gql`
  query Trending($after: String, $limit: Int) {
    trendingPosts(after: $after, limit: $limit) {
      edges {
        node {
          id
          art
          watermarkArt
          title
          author {
            ...UserInfo
          }
          width
          height
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${UserInfo}
`;

export const EDIT_POST_QUERY = gql`
  query EditPostInfo($id: ID!) {
    postId(id: $id) {
      id
      title
      watermarkArt
      author {
        id
        name
      }
      tags {
        name
        artCount
      }
      description
    }
  }
`;

// This is for the /report page for posts.
export const REPORT_POST_QUERY = gql`
  query ReportPostID($id: ID!) {
    postId(id: $id) {
      id
      title
      art
      watermarkArt
      author {
        id
        name
      }
      width
      height
    }
  }
`;
