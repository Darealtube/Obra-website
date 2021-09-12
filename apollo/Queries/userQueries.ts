import { gql } from "@apollo/client";
import { UserInfo, PostInfo, UserInfo2, UserInfo3 } from "../fragments";

export const USER_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

//Fetch User by ID
export const USER_ID_QUERY = gql`
  query UserID($id: ID!) {
    userId(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfo}
`;

export const DRAWER_COUNTS_QUERY = gql`
  query DrawerCounts($userId: ID!) {
    drawerCounts(userId: $userId) {
      commissions
      unreadNotif
      issues
    }
  }
`;

export const APPBAR_USER_QUERY = gql`
  query UserAppbarID($id: ID!, $after: String, $limit: Int) {
    userId(id: $id) {
      ...UserInfo
      admin
      email
      newUser
      tutorial
      notifications(after: $after, limit: $limit) {
        totalCount
        totalUnreadCount
        idList
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            commissionId
            commissioner {
              id
              name
              image
            }
            date
            description
            read
          }
        }
      }
    }
  }
  ${UserInfo}
`;

export const USER_WRAP_QUERY = gql`
  query UserPosts($name: String!, $userId: ID!) {
    userName(name: $name) {
      ...UserInfo
      ...UserInfo2
      isLikedBy(userId: $userId)
    }
  }
  ${UserInfo}
  ${UserInfo2}
`;

export const USER_POST_QUERY = gql`
  query UserPosts($name: String!, $after: String, $limit: Int) {
    userName(name: $name) {
      id
      posts(limit: $limit, after: $after) {
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
  }
  ${PostInfo}
`;

export const USER_LIKED_POST_QUERY = gql`
  query UserLikedPosts($name: String!, $after: String, $limit: Int) {
    userName(name: $name) {
      id
      likedPosts(limit: $limit, after: $after) {
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
  }
  ${PostInfo}
`;

export const USER_COMM_INFO_QUERY = gql`
  query CommissionInfo($name: String!) {
    userName(name: $name) {
      id
      commissionRates {
        type
        price
      }
      commissionPoster
    }
  }
`;

export const SETTINGS_QUERY = gql`
  query Settings($id: ID!) {
    userId(id: $id) {
      ...UserInfo
      ...UserInfo2
      ...UserInfo3
    }
  }
  ${UserInfo}
  ${UserInfo2}
  ${UserInfo3}
`;
