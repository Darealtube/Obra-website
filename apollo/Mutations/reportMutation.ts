import { gql } from "@apollo/client";

// This is for the submit mutation
export const REPORT_MUTATION = gql`
  mutation Report(
    $senderId: ID!
    $reportedId: ID
    $type: String!
    $title: String
    $description: String!
    $reason: String!
    $bugVid: String
    $vidFormat: String
  ) {
    sendReport(
      senderId: $senderId
      reportedId: $reportedId
      type: $type
      title: $title
      description: $description
      reason: $reason
      bugVid: $bugVid
      vidFormat: $vidFormat
    )
  }
`;

export const WARN_MUTATION = gql`
  mutation WarnPost(
    $reportId: ID!
    $reportedEmail: String!
    $title: String!
    $description: String!
    $reason: String!
  ) {
    sendWarning(
      reportId: $reportId
      reportedEmail: $reportedEmail
      title: $title
      description: $description
      reason: $reason
    )
  }
`;

export const DELETE_REPORT_MUTATION = gql`
  mutation DeleteReport($reportId: ID!) {
    deleteReport(reportId: $reportId)
  }
`;
