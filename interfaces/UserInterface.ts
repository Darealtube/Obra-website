import { PostInterface } from "./PostInterface";

export interface UserInterface {
  image: string;
  id: string;
  email: string;
  posts?: PostInterface[];
  likedPosts?: PostInterface[];
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: NotifInterface[]; // For now
  name?: string; // Not required for now
  tutorial?: boolean;
  country?: string;
  birthday?: string;
  artLevel?: string;
  artStyles: string[];
  artKinds: string[];
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

export interface edges {
  node: UserInterface;
}
