import { UserInterface } from "./UserInterface";

export interface CommentInterface {
  id: string;
  author: UserInterface;
  content: string;
  picture: string;
  date: string;
  postID: string;
}

export interface edges {
  node: CommentInterface;
}
