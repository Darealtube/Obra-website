import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    image: String
    createdAt: String
    updatedAt: String
    posts(after: ID, limit: Int): PostConnection
    likedPosts(after: ID, limit: Int): PostConnection
    likedArtists(after: ID, limit: Int): UserConnection
    notifications: [Notification]
    username: String
    age: String
    country: String
    birthday: String
    phone: String
    newUser: Boolean
    tutorial: Boolean
    notifRead: Boolean
    homeRecommended(after: ID, limit: Int): PostConnection
    history(after: ID, limit: Int): HistoryConnection
  }

  type Post {
    id: ID!
    date: String!
    tags: [String]
    title: String!
    description: String!
    art: String!
    price: String!
    sale: String!
    author: User
    picture: String
    comments(after: ID, limit: Int): CommentConnection
  }

  type Comment {
    id: ID!
    postID: ID!
    date: String!
    author: User!
    content: String!
  }

  type Query {
    users: [User]!
    posts(after: ID, limit: Int): PostConnection
    userId(id: ID!): User
    userName(name: String!): User
    postId(id: ID!): Post
    recommendedPosts(id: ID!, after: ID, limit: Int): PostConnection
    newPosts(after: ID, limit: Int): PostConnection
  }

  type Notification {
    user: User
    date: String
    description: String
    postId: ID
  }

  type History {
    id: ID!
    userId: ID
    viewed: Post
    lastDateViewed: String
  }

  type Mutation {
    likePost(postId: ID!, userName: String!): Boolean!
    unlikePost(postId: ID!, userName: String!): Boolean!
    editPost(
      postId: ID!
      title: String!
      description: String!
      tags: [String!]
    ): Boolean!
    createPost(
      date: String!
      tags: [String]
      title: String!
      description: String!
      art: String!
      price: String!
      sale: String!
      author: ID!
      picture: String
    ): Boolean!
    deletePost(postId: ID!): Boolean!
    editUser(
      userId: ID!
      username: String!
      age: String!
      country: String!
      language: String!
      birthday: String!
      phone: String!
    ): Boolean!
    readNotif(userId: ID!): Boolean!
    createComment(postID: ID!, author: ID!, content: String!): Comment!
    deleteComment(commentID: ID!): Boolean!
    likeArtist(artistID: ID!, userName: String!): Boolean!
    unlikeArtist(artistID: ID!, userName: String!): Boolean!
    viewPost(viewed: ID!, userId: ID!): Boolean!
    deleteHistory(historyID: ID!): Boolean!
  }

  type HistoryConnection {
    totalCount: Int
    pageInfo: PageInfo
    edges: [HistoryEdge]
  }

  type PostConnection {
    totalCount: Int
    pageInfo: PageInfo
    edges: [PostEdge]
  }

  type UserConnection {
    totalCount: Int
    pageInfo: PageInfo
    edges: [UserEdge]
  }

  type CommentConnection {
    totalCount: Int
    pageInfo: PageInfo
    edges: [CommentEdge]
  }

  type CommentEdge {
    node: Comment
  }

  type PostEdge {
    node: Post
  }

  type UserEdge {
    node: User
  }

  type HistoryEdge {
    node: History
  }

  type PageInfo {
    endCursor: ID
    hasNextPage: Boolean
  }
`;
