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

export interface LikeData {
  likePost: boolean;
}

export interface UnlikeData {
  unlikePost: boolean;
}

export interface UnlikeLikeVars {
  postId: string;
  userID: string;
}

export interface LikeArtistData {
  likePost: boolean;
}

export interface UnlikeArtistData {
  unlikePost: boolean;
}

export interface UnlikeLikeArtistVars {
  artistID: string;
  userID: string;
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

export interface ViewPostData {
  viewPost: boolean;
}

export interface ViewPostVars {
  viewed: string;
  userId: string;
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
  date: string;
  tags: string[];
  title: string;
  description: string;
  art: string;
  price: string;
  sale: string;
  author: string;
  width: number;
  height: number;
}

export interface AcceptCommissionData {
  acceptCommission: CommissionInterface;
}

export interface AcceptCommissionVars {
  commissionId: string;
  message?: string;
}
