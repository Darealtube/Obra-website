import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

export const POST_QUERY = gql`
  query Users {
    posts {
      id
      picture
      author
      date
      title
      tags
      art
    }
  }
`;

export const USER_ID_QUERY = gql`
  query UserID($name: String!) {
    userId(name: $name) {
      id
      name
      image
      likedPosts {
        id
      }
    }
  }
`;

export const POST_ID_QUERY = gql`
  query PostID($id: ID!) {
    postId(id: $id) {
      id
      title
      art
      author
      sale
      price
      tags
      description
    }
  }
`;

export const APPBAR_USER_QUERY = gql`
  query UserAppbarID($name: String!) {
    userId(name: $name) {
      name
      image
      email
      notifications {
        postId
        user {
          image
        }
        date
        description
      }
    }
  }
`;

export const USER_POST_QUERY = gql`
  query UserPosts($name: String!) {
    userId(name: $name) {
      name
      image
      posts {
        id
        author
        picture
        date
        art
        tags
      }
    }
  }
`;

export const LIKE_MUTATION = gql`
  mutation Like($postId: ID!, $userName: String!) {
    likePost(postId: $postId, userName: $userName)
  }
`;

export const UNLIKE_MUTATION = gql`
  mutation unLike($postId: ID!, $userName: String!) {
    unlikePost(postId: $postId, userName: $userName)
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation EditPost(
    $postId: ID!
    $title: String!
    $description: String!
    $tags: [String!]
  ) {
    editPost(
      postId: $postId
      title: $title
      description: $description
      tags: $tags
    )
  }
`;
