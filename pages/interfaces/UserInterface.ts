import { PostInterface } from "./PostInterface";

export interface UserInterface {
  tenant: string;
  client_id: string;
  connection: string;
  avatar: string;
  _id: string;
  email: string;
  username?: string;
  email_verified: boolean;
  posts?: PostInterface[];
  likedPosts?: PostInterface[];
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: NotifInterface[]; // For now
  request_language: string;
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
  verified?: UserInterface["email_verified"];
}
