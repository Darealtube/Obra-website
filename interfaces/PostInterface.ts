import { Tag } from "../Hooks/Reducers/PostReducer";
import { CommentInterface } from "./CommentInterface";
import { UserInterface } from "./UserInterface";

export interface PostInterface {
  id: string;
  author?: UserInterface;
  date: string;
  art: string;
  watermarkArt: string;
  tags: Tag[];
  title: string;
  description: string;
  likes?: number;
  comments?: PostComments;
  width: number;
  height: number;
}

export interface edges {
  node: PostInterface;
}

export interface commentEdges {
  node: CommentInterface;
}

export interface PostComments {
  edges: commentEdges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface RecommendedPosts {
  edges: edges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface TagInterface {
  name: string;
  artCount: number;
}

export interface CategoryInterface {
  id: string;
  name: string;
  artCount: string;
}

export interface TagEdges {
  node: TagInterface;
}

export interface CategoryEdges {
  node: CategoryInterface;
}

export interface Categories {
  edges: CategoryEdges[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface Tags {
  edges: TagEdges[];
}
