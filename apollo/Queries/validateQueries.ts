import { gql } from "@apollo/client";

export const IS_LIKED_ARTIST = gql`
  query islikedArtist($userID: ID, $artistName: String!) {
    isLikedArtist(userID: $userID, artistName: $artistName)
  }
`;

export const IS_LIKED_POST = gql`
  query Liked($userID: ID, $postID: ID!) {
    isLikedPost(userID: $userID, postID: $postID)
  }
`;

export const IS_ADMIN = gql`
  query isAdmin($id: ID) {
    isAdmin(id: $id)
  }
`;

export const USER_EXISTS = gql`
  query UserExist($userName: String!, $userId: ID!) {
    userExists(userName: $userName, userId: $userId)
  }
`;
