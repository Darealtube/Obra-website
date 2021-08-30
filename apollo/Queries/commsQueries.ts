import { gql } from "@apollo/client";

export const COMMISSIONS_QUERY = gql`
  query Commissions($id: ID!, $after: String, $limit: Int) {
    userId(id: $id) {
      id
      commissions(after: $after, limit: $limit) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            fromUser {
              id
              name
              image
            }
            dateIssued
            title
            deadline
            description
          }
        }
      }
    }
  }
`;

export const YOUR_COMMISSIONS_QUERY = gql`
  query Commissions($id: ID!, $after: String, $limit: Int) {
    userId(id: $id) {
      id
      yourCommissions(after: $after, limit: $limit) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            fromUser {
              id
              name
              image
            }
            dateIssued
            title
            deadline
            description
          }
        }
      }
    }
  }
`;

export const COMMISSION_COUNT_QUERY = gql`
  query CommissionCount($id: ID!) {
    userId(id: $id) {
      id
      commissionCount
    }
  }
`;

export const COMMISSION_ID_QUERY = gql`
  query CommissionID($id: ID!) {
    commissionId(id: $id) {
      id
      fromUser {
        id
        name
        image
      }
      toArtist {
        id
      }
      finished
      accepted
      price
      rates
      dateIssued
      title
      deadline
      width
      height
      sampleArt
      description
    }
  }
`;
