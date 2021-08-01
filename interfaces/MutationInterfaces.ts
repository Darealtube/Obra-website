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
  tags: string[];
  title: string;
  description: string;
  art: string;
  watermarkArt: string;
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

export interface FinishCommissionVars {
  commissionId: string;
  finishedArt: string;
  message: string;
  finishedwatermarkArt: string;
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

export interface addUnaddToCartVars {
  userID: string;
  postID?: string;
  cost?: number;
}

export interface CartRemoveVars {
  userID: string;
  itemID?: string;
  selected?: string[];
}

export interface CartRemoveSelectedData {
  removeSelectedFromCart: CartRemoveResult;
}

export interface CartRemoveData {
  removeFromCart: CartRemoveResult;
}

interface CartRemoveResult {
  __typename?: string;
  optimistic?: boolean;
  idList: string[];
  totalCost: number;
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
