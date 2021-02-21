import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    image: String
    createdAt: String
    updatedAt: String
    posts: [Post]
    likedPosts: [Post]
    notifications: [Notification]
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
    posts: [Post]
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
  }
`;
