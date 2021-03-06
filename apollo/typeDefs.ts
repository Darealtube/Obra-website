import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    image: String
    createdAt: String
    updatedAt: String
    posts(offset: Int, limit: Int): [Post]
    likedPosts(offset: Int, limit: Int): [Post]
    likedPostslength: Int
    postsLength: Int
    notifications: [Notification]
    username: String
    age: String
    country: String
    birthday: String
    phone: String
    newUser: Boolean
    tutorial: Boolean
    notifRead: Boolean
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
  }

  type Query {
    users: [User]!
    posts(offset: Int, limit: Int): [Post]
    userId(id: ID!): User
    userName(name: String!): User
    postId(id: ID!): Post
  }

  type Notification {
    user: User
    date: String
    description: String
    postId: ID
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
      author: String
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
  }
`;
