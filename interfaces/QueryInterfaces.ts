import { PostInterface, RecommendedPosts } from "./PostInterface";
import { Posts, UserInterface } from "./UserInterface";

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
