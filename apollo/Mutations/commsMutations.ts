import { gql } from "@apollo/client";

export const CREATE_COMMISSION_MUTATION = gql`
  mutation CreateCommission(
    $artistName: String!
    $userId: ID!
    $title: String!
    $description: String!
    $sampleArt: String!
    $height: Int!
    $width: Int!
    $deadline: Int
    $price: Float!
    $rates: [String]!
  ) {
    commissionArtist(
      artistName: $artistName
      userId: $userId
      title: $title
      description: $description
      sampleArt: $sampleArt
      height: $height
      width: $width
      deadline: $deadline
      price: $price
      rates: $rates
    )
  }
`;

export const DELETE_COMMISSION_MUTATION = gql`
  mutation DeleteCommission($commissionId: ID!, $reason: String) {
    deleteCommission(commissionId: $commissionId, reason: $reason)
  }
`;
