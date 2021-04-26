import { PostInterface } from "./PostInterface";

export interface UserInterface {
  image?: string;
  id: string;
  email: string;
  posts?: Posts;
  likedPosts?: Posts;
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: NotifInterface[]; // For now
  name?: string; // Not required for now
  tutorial?: boolean;
  newUser?: boolean;
  country?: string;
  birthday?: string;
  artLevel?: string;
  artStyles?: string[];
  artKinds?: string[];
  userBio?: string;
  backdrop?: string;
  notifRead?: boolean;
  homeRecommended: Posts;
  phone: string;
  age: string;
  // More to come
}

export interface UserData {
  user: UserInterface;
}

export interface NotifInterface {
  user: UserInterface;
  date: string;
  description: string;
  postId: string;
}

export interface edges {
  node: PostInterface;
}

export interface Posts {
  edges: edges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}
