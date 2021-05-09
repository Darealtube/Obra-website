import { PostInterface, RecommendedPosts } from "./PostInterface";
import { CommissionInterface, Posts, UserInterface } from "./UserInterface";

export interface SettingsData {
  userId: UserInterface;
}

export interface SettingsVars {
  id: string;
}

export interface AppbarUserData {
  userId: UserInterface;
}

export interface AppbarVars {
  id: string;
}

export interface PostData {
  postId: PostInterface;
}

export interface PostVars {
  id: string;
  after?: string;
}

export interface RecommendedPostData {
  recommendedPosts: RecommendedPosts;
}

export interface UserData {
  userName: UserInterface;
}

export interface UserVars {
  name: string;
  after?: string;
}

export interface FeaturedPostsData {
  featuredPosts: Posts;
}

export interface NewPostsData {
  newPosts: Posts;
}

export interface HomeUserData {
  userId: UserInterface;
}

export interface HomeUserVars {
  id: string;
  after?: string;
}

export interface PaginatedPostsVars {
  after?: string;
}

export interface CommissionData {
  userId: UserInterface;
}

export interface CommissionVars {
  id: string;
  after?: string;
}

export interface CommissionIdData {
  commissionId: CommissionInterface;
}

export interface CommissionIdVars {
  id: string;
}
