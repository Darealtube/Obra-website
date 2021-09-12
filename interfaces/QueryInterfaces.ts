import { CommentInterface } from "./CommentInterface";
import {
  Categories,
  CategoryInterface,
  PostInterface,
  RecommendedPosts,
  Tags,
} from "./PostInterface";
import { ReportInterface, Reports } from "./ReportInterface";
import {
  CommissionInterface,
  Posts,
  UserInterface,
  Users,
} from "./UserInterface";

export interface SettingsData {
  userId: UserInterface;
}

export interface AppbarUserData {
  userId: UserInterface;
}

export interface PostData {
  postId: PostInterface;
}

export interface isLikedData {
  isLikedPost: boolean;
}

export interface isLikedVars {
  postID: string;
  userID: string;
}

export interface RecommendedPostData {
  recommendedPosts: RecommendedPosts;
}

export interface UserData {
  userName: UserInterface;
}

export interface UserWrapVars {
  name: string;
  userId: string;
  limit?: number;
  after?: string;
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

export interface PopularCategoriesData {
  popularCategories: CategoryInterface[];
}

export interface CategoryPostsData {
  categoryPosts: Posts;
}

export interface CategoryPostsVars {
  category: string;
  limit?: number;
  after?: number;
}

export interface SearchData {
  search: Users | Categories | Tags;
}

export interface SearchVars {
  key: string;
  type: "user" | "category" | "tag"; // Add more in the future (maybe)
  after?: string;
  limit?: number;
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
