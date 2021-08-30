import { gql } from "@apollo/client";

export const DELETE_NOTIF_MUTATION = gql`
  mutation DeleteNotification($notifId: ID!, $userId: ID!) {
    deleteNotification(notifId: $notifId, userId: $userId)
  }
`;

export const READ_NOTIF = gql`
  mutation ReadNotif($notifArray: [ID!]) {
    readNotif(notifArray: $notifArray)
  }
`;
