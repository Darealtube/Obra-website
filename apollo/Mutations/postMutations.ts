import { gql } from "@apollo/client";

export const LIKE_UNLIKE_MUTATION = gql`
  mutation Like($postId: ID!, $userID: ID!, $action: String!) {
    likeUnlikePost(postId: $postId, userID: $userID, action: $action)
  }
`;

export const LIKE_UNLIKE_ARTIST_MUTATION = gql`
  mutation LikeArtist($artistID: ID!, $userID: ID!, $action: String!) {
    likeUnlikeArtist(artistID: $artistID, userID: $userID, action: $action)
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation EditPost(
    $postId: ID
    $title: String!
    $description: String!
    $tags: [String!]
  ) {
    editPost(
      postId: $postId
      title: $title
      description: $description
      tags: $tags
    ) {
      id
      title
      description
      tags {
        name
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $tags: [String]
    $title: String!
    $description: String!
    $art: String!
    $watermarkArt: String!
    $author: ID!
    $width: Int!
    $height: Int!
  ) {
    createPost(
      tags: $tags
      title: $title
      description: $description
      art: $art
      author: $author
      width: $width
      height: $height
      watermarkArt: $watermarkArt
    )
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
