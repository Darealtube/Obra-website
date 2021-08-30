import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
  query SearchTag($key: String!, $type: String!, $after: String, $limit: Int) {
    search(key: $key, type: $type, after: $after, limit: $limit) {
      __typename
      ... on TagConnection {
        edges {
          node {
            name
            artCount
          }
        }
      }
      ... on UserConnection {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
            image
          }
        }
      }
      ... on CategoryConnection {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            artCount
          }
        }
      }
    }
  }
`;

export const POPULAR_CATEGORIES_QUERY = gql`
  query PopularCategories {
    popularCategories {
      id
      name
      artCount
    }
  }
`;

export const CATEGORY_POSTS_QUERY = gql`
  query CategoryPosts($category: String!, $after: String, $limit: Int) {
    categoryPosts(category: $category, after: $after, limit: $limit) {
      edges {
        node {
          id
          art
          watermarkArt
          title
          width
          height
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;
