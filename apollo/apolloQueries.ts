import { gql } from "@apollo/client";

//Fetch all Users
export const USER_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

//Fetch all Posts
export const POST_QUERY = gql`
  query Posts {
    posts {
      id
      picture
      author {
        id
        name
      }
      date
      title
      tags
      art
    }
  }
`;

//Fetch User by ID
export const USER_ID_QUERY = gql`
  query UserID($id: ID!) {
    userId(id: $id) {
      id
      name
      image
      likedPosts {
        id
      }
    }
  }
`;

//Fetch Post By ID
export const POST_ID_QUERY = gql`
  query PostID($id: ID!) {
    postId(id: $id) {
      id
      title
      art
      author {
        id
        name
      }
      sale
      price
      tags
      description
    }
  }
`;

//Fetch Appbar Info
export const APPBAR_USER_QUERY = gql`
  query UserAppbarID($id: ID!) {
    userId(id: $id) {
      id
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

//Fetch User and Posts
export const USER_POST_QUERY = gql`
  query UserPosts($name: String!) {
    userName(name: $name) {
      id
      name
      image
      posts {
        id
        author {
          id
          name
        }
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

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $date: String!
    $tags: [String]
    $title: String!
    $description: String!
    $art: String!
    $price: String!
    $sale: String!
    $author: String!
    $picture: String!
  ) {
    createPost(
      date: $date
      tags: $tags
      title: $title
      description: $description
      art: $art
      price: $price
      sale: $sale
      author: $author
      picture: $picture
    )
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
