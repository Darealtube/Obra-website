import { gql } from "@apollo/client";

export const PostInfo = gql`
  fragment PostInfo on Post {
    id
    author {
      id
      name
      image
      email
    }
    title
    description
    date
    art
    watermarkArt
    width
    height
    tags {
      name
    }
  }
`;

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    name
    image
  }
`;

export const UserInfo2 = gql`
  fragment UserInfo2 on User {
    userBio
    email
    age
    birthday
    country
    phone
    artLevel
    backdrop
  }
`;

export const UserInfo3 = gql`
  fragment UserInfo3 on User {
    commissionPoster
    commissionRates {
      type
      price
    }
  }
`;
