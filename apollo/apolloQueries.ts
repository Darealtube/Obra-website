import { gql } from "@apollo/client";

// This is where we set Client-side query requests using gql.
// In order to know the syntax you must learn how GraphQL works.

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
    artStyles
    artKinds
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

//Fetch all Users
export const USER_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

//Fetch User by ID
export const USER_ID_QUERY = gql`
  query UserID($id: ID!) {
    userId(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfo}
`;

//Fetch Post By ID
export const POST_ID_QUERY = gql`
  query PostID($id: ID!, $after: String, $limit: Int) {
    postId(id: $id) {
      id
      title
      author {
        id
        name
        image
        artCount
      }
      date
      likes
      tags {
        name
      }
      description
      watermarkArt
      comments(after: $after, limit: $limit) {
        totalCount
        edges {
          node {
            id
            author {
              id
              image
              name
            }
            date
            content
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
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

export const COMMENT_ID_QUERY = gql`
  query CommentID($id: ID!) {
    commentId(id: $id) {
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
`;

//Fetch Appbar Info
export const APPBAR_USER_QUERY = gql`
  query UserAppbarID($id: ID!, $after: String, $limit: Int) {
    userId(id: $id) {
      ...UserInfo
      admin
      email
      newUser
      tutorial
      notifications(after: $after, limit: $limit) {
        totalCount
        totalUnreadCount
        idList
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            commissionId
            commissioner {
              id
              name
              image
            }
            date
            description
            read
          }
        }
      }
    }
  }
  ${UserInfo}
`;

//Fetch User and Posts
export const USER_POST_QUERY = gql`
  query UserPosts($name: String!, $after: String, $limit: Int) {
    userName(name: $name) {
      ...UserInfo
      ...UserInfo2
      posts(limit: $limit, after: $after) {
        edges {
          node {
            ...PostInfo
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${PostInfo}
  ${UserInfo}
  ${UserInfo2}
`;

export const USER_LIKED_POST_QUERY = gql`
  query UserPosts($name: String!, $after: String, $limit: Int) {
    userName(name: $name) {
      ...UserInfo
      ...UserInfo2
      likedPosts(limit: $limit, after: $after) {
        edges {
          node {
            ...PostInfo
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${PostInfo}
  ${UserInfo}
  ${UserInfo2}
`;

export const POST_RECOMMENDED_QUERY = gql`
  query RecommendedPosts($id: ID!, $after: String, $limit: Int) {
    recommendedPosts(id: $id, limit: $limit, after: $after) {
      edges {
        node {
          ...PostInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${PostInfo}
`;

export const TRENDING_POSTS_QUERY = gql`
  query Trending($after: String, $limit: Int) {
    trendingPosts(after: $after, limit: $limit) {
      edges {
        node {
          id
          art
          watermarkArt
          title
          author {
            ...UserInfo
          }
          width
          height
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${UserInfo}
`;

export const EDIT_POST_QUERY = gql`
  query EditPostInfo($id: ID!) {
    postId(id: $id) {
      id
      title
      watermarkArt
      author {
        id
        name
      }
      tags {
        name
        artCount
      }
      description
    }
  }
`;

// This is for the /report page for posts.
export const REPORT_POST_QUERY = gql`
  query ReportPostID($id: ID!) {
    postId(id: $id) {
      id
      title
      art
      watermarkArt
      author {
        id
        name
      }
      width
      height
    }
  }
`;

export const SETTINGS_QUERY = gql`
  query Settings($id: ID!) {
    userId(id: $id) {
      ...UserInfo
      ...UserInfo2
      ...UserInfo3
    }
  }
  ${UserInfo}
  ${UserInfo2}
  ${UserInfo3}
`;

export const USER_COMM_INFO_QUERY = gql`
  query CommissionInfo($name: String!) {
    userName(name: $name) {
      id
      commissionRates {
        type
        price
      }
      commissionPoster
    }
  }
`;

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

export const ALL_USER_QUERY = gql`
  query AllUsers {
    allUsersList
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
          price
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

export const SEARCH_QUERY = gql`
  query SearchTag($key: String!, $type: String!, $after: String, $limit: Int) {
    search(key: $key, type: $type, after: $after, limit: $limit) {
      __typename
      ... on TagConnection {
        edges {
          node {
            name
            artCount
          }
        }
      }
      ... on UserConnection {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
            image
          }
        }
      }
      ... on CategoryConnection {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            artCount
          }
        }
      }
    }
  }
`;

export const POPULAR_CATEGORIES_QUERY = gql`
  query PopularCategories {
    popularCategories {
      id
      name
      artCount
    }
  }
`;

export const CATEGORY_POSTS_QUERY = gql`
  query CategoryPosts($category: String!, $after: String, $limit: Int) {
    categoryPosts(category: $category, after: $after, limit: $limit) {
      edges {
        node {
          id
          art
          watermarkArt
          title
          width
          height
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const IS_LIKED_ARTIST = gql`
  query islikedArtist($userID: ID, $artistName: String!) {
    isLikedArtist(userID: $userID, artistName: $artistName)
  }
`;

export const IS_LIKED_POST = gql`
  query Liked($userID: ID, $postID: ID!) {
    isLikedPost(userID: $userID, postID: $postID)
  }
`;

export const IS_ADMIN = gql`
  query isAdmin($id: ID) {
    isAdmin(id: $id)
  }
`;

export const USER_EXISTS = gql`
  query UserExist($userName: String!, $userId: ID!) {
    userExists(userName: $userName, userId: $userId)
  }
`;

export const GALLERY_EXISTS = gql`
  query GalleryExist($userName: String!) {
    galleryExists(userName: $userName)
  }
`;

export const IS_SAME_USER = gql`
  query SameUser($userName: String!, $userId: ID!) {
    isSameUser(userName: $userName, userId: $userId)
  }
`;

export const LIKE_UNLIKE_MUTATION = gql`
  mutation Like($postId: ID!, $userID: ID!, $action: String!) {
    likeUnlikePost(postId: $postId, userID: $userID, action: $action)
  }
`;

export const LIKE_UNLIKE_ARTIST_MUTATION = gql`
  mutation LikeArtist($artistID: ID!, $userID: ID!, $action: String!) {
    likeUnlikeArtist(artistID: $artistID, userID: $userID, action: $action)
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation EditPost(
    $postId: ID
    $title: String!
    $description: String!
    $tags: [String!]
  ) {
    editPost(
      postId: $postId
      title: $title
      description: $description
      tags: $tags
    ) {
      id
      title
      description
      tags {
        name
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $tags: [String]
    $title: String!
    $description: String!
    $art: String!
    $watermarkArt: String!
    $author: ID!
    $width: Int!
    $height: Int!
  ) {
    createPost(
      tags: $tags
      title: $title
      description: $description
      art: $art
      author: $author
      width: $width
      height: $height
      watermarkArt: $watermarkArt
    )
  }
`;

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

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentID: ID!) {
    deleteComment(commentID: $commentID)
  }
`;

export const DELETE_NOTIF_MUTATION = gql`
  mutation DeleteNotification($notifId: ID!, $userId: ID!) {
    deleteNotification(notifId: $notifId, userId: $userId)
  }
`;

export const DELETE_COMMISSION_MUTATION = gql`
  mutation DeleteCommission($commissionId: ID!, $reason: String) {
    deleteCommission(commissionId: $commissionId, reason: $reason)
  }
`;

export const DELETE_REPORT_MUTATION = gql`
  mutation DeleteReport($reportId: ID!) {
    deleteReport(reportId: $reportId)
  }
`;

export const CONFIG_MUTATION = gql`
  mutation ConfigUser(
    $userId: ID!
    $name: String!
    $age: String!
    $country: String!
    $language: String!
    $birthday: String!
    $phone: String!
    $artLevel: String!
    $artStyles: [String!]
    $artKinds: [String!]
  ) {
    configUser(
      userId: $userId
      name: $name
      age: $age
      country: $country
      language: $language
      birthday: $birthday
      phone: $phone
      artLevel: $artLevel
      artStyles: $artStyles
      artKinds: $artKinds
    )
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation EditUser(
    $userId: ID!
    $name: String!
    $country: String!
    $birthday: String!
    $artLevel: String!
    $artStyles: [String!]
    $artKinds: [String!]
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
      artStyles: $artStyles
      artKinds: $artKinds
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
      artStyles
      artKinds
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

export const READ_NOTIF = gql`
  mutation ReadNotif($notifArray: [ID!]) {
    readNotif(notifArray: $notifArray)
  }
`;

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
