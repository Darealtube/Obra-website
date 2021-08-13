import { CommentInterface } from "./CommentInterface";
import { PostInterface, RecommendedPosts } from "./PostInterface";
import { ReportInterface, Reports } from "./ReportInterface";
import { CommissionInterface, Posts, UserInterface } from "./UserInterface";

export interface SettingsData {
  userId: UserInterface;
}

export interface AppbarUserData {
  userId: UserInterface;
}

export interface PostData {
  postId: PostInterface;
}

export interface isLikedorAddedData {
  isLikedorAddedPost: LikedorAdded;
}

interface LikedorAdded {
  isLiked: boolean;
  isAdded: boolean;
}

export interface isLikedorAddedVars {
  postID: string;
  userID: string;
}

export interface RecommendedPostData {
  recommendedPosts: RecommendedPosts;
}

export interface UserData {
  userName: UserInterface;
}

export interface TrendingPostsData {
  trendingPosts: Posts;
}

export interface HomeUserData {
  userId: UserInterface;
}

export interface PaginatedPostsVars {
  after?: string;
  limit?: number;
}

export interface CommissionData {
  userId: UserInterface;
}

export interface CommissionIdData {
  commissionId: CommissionInterface;
}

export interface UserIdData {
  userId: UserInterface;
}

export interface CommentIdData {
  commentId: CommentInterface;
}

export interface ReportData {
  reports: Reports;
}

export interface ReportIdData {
  reportId: ReportInterface;
}

export interface ReportIdVars {
  reportedId: string;
}

export interface ReportVars {
  after?: string;
  limit?: number;
  type?: string;
}

export interface QueryIdVars {
  id: string;
  after?: string;
  limit?: number;
}

export interface QueryNameVars {
  name: string;
  after?: string;
  limit?: number;
}
