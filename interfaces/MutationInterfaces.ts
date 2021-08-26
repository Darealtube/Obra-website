import { CommentInterface } from "./CommentInterface";
import { PostInterface } from "./PostInterface";
import { CommissionInterface, UserInterface } from "./UserInterface";

export interface ReadNotifData {
  readNotif: boolean;
}

export interface ReadNotifVars {
  notifArray: string[];
}

export interface AddCommentData {
  createComment: CommentInterface;
}

export interface EditUserData {
  editUser: UserInterface;
}

export interface LikeUnlikeData {
  likeUnlikePost: boolean;
}

export interface UnlikeLikeVars {
  postId: string;
  userID: string;
  action: string;
}

export interface LikeUnlikeArtistData {
  likeUnlikeArtist: boolean;
}

export interface UnlikeLikeArtistVars {
  artistID: string;
  userID: string;
  action: string;
}

export interface EditPostData {
  editPost: PostInterface;
}

export interface EditPostVars {
  postId: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ConfigData {
  congifUser: boolean;
}

export interface ConfigVars {
  userId: string;
  name: string;
  age: string;
  country: string;
  language: string;
  birthday: string;
  phone: string;
  artLevel: string;
  artKinds: string[];
  artStyles: string[];
}

export interface CreatePostData {
  createPost: boolean;
}

export interface CreatePostVars {
  tags: string[];
  title: string;
  description: string;
  art: string;
  watermarkArt: string;
  author: string;
  width: number;
  height: number;
}

export interface CommissionArtistVars {
  artistName: string;
  userId: string;
  title: string;
  description: string;
  sampleArt: string;
  height: number;
  width: number;
  deadline?: number;
  price: number;
  rates: string[];
}

export interface ReportVars {
  senderId: string;
  reportedId?: string;
  type: string;
  title?: string;
  description: string;
  reason: string;
  bugVid?: string;
  vidFormat?: string;
}

export interface WarnVars {
  reportId: string;
  reportedEmail: string;
  title: string;
  description: string;
  reason: string;
}

export interface EditUserCommVars {
  userId: string;
  commissionPoster: string;
  commissionRates: RatesInput[];
}

export interface EditUserCommData {
  editUserComm: UserInterface;
}

interface RatesInput {
  type: string;
  price: number;
}
