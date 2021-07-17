import { PostInterface } from "./PostInterface";

export interface UserInterface {
  image?: string;
  id: string;
  email: string;
  posts?: Posts;
  likedPosts?: Posts;
  likedArtists?: UserInterface[];
  balance?: string;
  notifications?: Notifications;
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
  homeRecommended: Posts;
  phone: string;
  age: string;
  commissions: Commissions;
  yourCommissions: Commissions;
  pendingCommissions: Commissions;
  yourPendingCommissions: Commissions;
  yourFinishedCommissions: FinishedCommissions;
  admin: boolean;
  cart: CartItems;
  commissionPoster: string;
  commissionRates: Rates[];
  // More to come
}

export interface Rates {
  __typename?: string;
  type: string;
  price: number;
}

export interface UserData {
  user: UserInterface;
}

export interface NotifInterface {
  id: string;
  commissioner: UserInterface;
  date: string;
  description: string;
  commissionId: string;
  read: boolean;
}

export interface CommissionInterface {
  id: string;
  fromUser: UserInterface;
  toArtist: UserInterface;
  title: string;
  description: string;
  sampleArt: string;
  width: number;
  height: number;
  deadline: string;
  dateIssued: string;
  accepted: boolean;
  finished: boolean;
  price: number;
  rates: string[];
  finishedArt: string;
  finishedwatermarkArt: string;
  message: string;
}

export interface CartInterface {
  id: string;
  postID: PostInterface;
  dateAdded: string;
  cost: number;
}

export interface cartedges {
  node: CartInterface;
}

export interface CartItems {
  edges: cartedges[];
  pageInfo: PageInfo;
  totalCount: number;
  totalCost: number;
  idList: string[];
}

export interface commissionedges {
  node: CommissionInterface;
}

export interface Commissions {
  edges: commissionedges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface FinishedCommissions {
  edges: commissionedges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface notifedges {
  node: NotifInterface;
}

export interface Notifications {
  edges: notifedges[];
  pageInfo: PageInfo;
  totalCount: number;
  totalUnreadCount: number;
  idList: string[];
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
