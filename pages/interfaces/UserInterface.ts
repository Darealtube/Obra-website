import { PostInterface } from "./PostInterface";

export interface UserInterface {
  _id: string;
  email: string;
  username?: string;
  verified: string;
  posts?: PostInterface[];
  likedPosts?: PostInterface[];
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: string[]; // For now

  // More to come
}

export interface UserData {
  userData: UserInterface;
}
