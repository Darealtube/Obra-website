import { PostInterface } from "./PostInterface";

export interface UserInterface {
  image: string;
  _id: string;
  email: string;
  username?: string;
  posts?: PostInterface[];
  likedPosts?: PostInterface[];
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: NotifInterface[]; // For now
  name?: string; // Not required for now
  tutorial?: boolean;
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

export interface UserPropId {
  data: UserInterface;
  error?: string;
}
