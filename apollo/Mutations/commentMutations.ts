import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postID: ID!, $author: ID!, $content: String!) {
    createComment(postID: $postID, author: $author, content: $content) {
      __typename
      id
      author {
        __typename
        id
        image
        name
      }
      date
      content
    }
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentID: ID!) {
    deleteComment(commentID: $commentID)
  }
`;
