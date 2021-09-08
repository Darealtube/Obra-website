import { gql } from "@apollo/client";
import { UserInfo, PostInfo } from "../fragments";

export const REPORT_COUNT_QUERY = gql`
  query ReportCount {
    reportCount {
      totalCount
      postReport
      commentReport
      userReport
      bugReport
    }
  }
`;

export const REPORTED_POSTS_QUERY = gql`
  query ReportedPost($after: String, $limit: Int) {
    reports(after: $after, limit: $limit, type: "Post") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          senderId {
            ...UserInfo
          }
          reportedId {
            ... on Post {
              id
              author {
                id
                email
              }
            }
          }
          date
          title
          description
          reason
        }
      }
    }
  }
  ${UserInfo}
`;

export const REPORTED_COMMENTS_QUERY = gql`
  query ReportedComment($after: String, $limit: Int) {
    reports(after: $after, limit: $limit, type: "Comment") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          senderId {
            ...UserInfo
          }
          reportedId {
            ... on Comment {
              id
              author {
                id
                name
                image
                email
              }
              content
              date
              postID
            }
          }
          date
          title
          description
          reason
        }
      }
    }
  }
  ${UserInfo}
`;

export const BUG_REPORTS_QUERY = gql`
  query BugReports($after: String, $limit: Int) {
    reports(after: $after, limit: $limit, type: "Bug") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          senderId {
            ...UserInfo
          }
          date
          description
          reason
          bugVid
          vidFormat
        }
      }
    }
  }
  ${UserInfo}
`;

export const REPORT_ID_QUERY = gql`
  query ReportID($reportedId: ID!) {
    reportId(reportedId: $reportedId) {
      id
      senderId {
        ...UserInfo
      }
      reportedId {
        ... on Post {
          ...PostInfo
        }
        ... on Comment {
          id
          author {
            id
            name
            image
            email
          }
          content
          date
          postID
        }
      }
      date
      title
      description
      reason
      type
      bugVid
      vidFormat
    }
  }
  ${UserInfo}
  ${PostInfo}
`;
