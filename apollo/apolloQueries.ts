import { gql } from "@apollo/client";

export const PostInfo = gql`
  fragment PostInfo on Post {
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
`;

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
  query Posts($offset: Int) {
    posts(limit: 4, offset: $offset) {
      ...PostInfo
    }
  }
  ${PostInfo}
`;

//Fetch User by ID
export const USER_ID_QUERY = gql`
  query UserID($id: ID!, $offset: Int) {
    userId(id: $id) {
      id
      name
      image
      likedPosts(limit: 4, offset: $offset) {
        id
      }
    }
  }
`;

//Fetch Post By ID
export const POST_ID_QUERY = gql`
  query PostID($id: ID!, $offset: Int) {
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
      comments(offset: $offset, limit: 4) {
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
      newUser
      tutorial
      notifRead
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
  query UserPosts($name: String!, $offset: Int) {
    userName(name: $name) {
      id
      name
      image
      posts(limit: 4, offset: $offset) {
        ...PostInfo
      }
      username
      birthday
      country
      phone
    }
  }
  ${PostInfo}
`;

export const USER_LIKED_POST_QUERY = gql`
  query UserPosts($name: String!, $offset: Int) {
    userName(name: $name) {
      id
      name
      image
      likedPosts(limit: 4, offset: $offset) {
        ...PostInfo
      }
      username
      birthday
      country
      phone
    }
  }
  ${PostInfo}
`;

/* export const POST_RECOMMENDED_QUERY = gql`
  query RecommendedPosts($id: ID!, $offset: Int, $limit: Int) {
    recommendedPosts(id: $id, offset: $offset, limit: $limit) {
      ...PostInfo
    }
  }
  ${PostInfo}
`; */

export const POST_RECOMMENDED_QUERY = gql`
  query RecommendedPosts($id: ID!, $offset: Int) {
    recommendedPosts(id: $id, limit: 4, offset: $offset) {
      ...PostInfo
    }
  }
  ${PostInfo}
`;

export const NEW_POSTS_QUERY = gql`
  query NewPosts($offset: Int) {
    newPosts(offset: $offset, limit: 4) {
      ...PostInfo
    }
  }
  ${PostInfo}
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

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postID: ID!, $author: String!, $content: String!) {
    createComment(postID: $postID, author: $author, content: $content) {
      id
      date
      content
      author {
        id
        name
        image
      }
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentID: ID!) {
    deleteComment(commentID: $commentID)
  }
`;

export const CONFIG_MUTATION = gql`
  mutation ConfigUser(
    $userId: ID!
    $username: String!
    $age: String!
    $country: String!
    $language: String!
    $birthday: String!
    $phone: String!
  ) {
    editUser(
      userId: $userId
      username: $username
      age: $age
      country: $country
      language: $language
      birthday: $birthday
      phone: $phone
    )
  }
`;

export const READ_NOTIF = gql`
  mutation ReadNotif($userId: ID!) {
    readNotif(userId: $userId)
  }
`;
