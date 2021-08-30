import { gql } from "@apollo/client";

export const EDIT_USER_MUTATION = gql`
  mutation EditUser(
    $userId: ID!
    $name: String!
    $country: String!
    $birthday: String!
    $artLevel: String!
    $userBio: String
    $image: String
    $backdrop: String
    $phone: String
    $age: String
  ) {
    editUser(
      userId: $userId
      name: $name
      country: $country
      birthday: $birthday
      artLevel: $artLevel
      userBio: $userBio
      image: $image
      backdrop: $backdrop
      phone: $phone
      age: $age
    ) {
      id
      name
      country
      birthday
      artLevel
      userBio
      image
      backdrop
      phone
      age
    }
  }
`;

export const EDIT_COMMISSION_SETTINGS_MUTATION = gql`
  mutation EditCommSettings(
    $userId: ID!
    $commissionPoster: String!
    $commissionRates: [RatesInput]
  ) {
    editUserComm(
      userId: $userId
      commissionPoster: $commissionPoster
      commissionRates: $commissionRates
    ) {
      id
      commissionPoster
      commissionRates {
        type
        price
      }
    }
  }
`;
