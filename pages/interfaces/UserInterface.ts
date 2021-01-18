import { PostInterface } from "./PostInterface";

export interface UserInterface {
  picture: string;
  _id: string;
  email: string;
  username?: string;
  email_verified: boolean;
  posts?: PostInterface[];
  likedPosts?: PostInterface[];
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: NotifInterface[]; // For now
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
