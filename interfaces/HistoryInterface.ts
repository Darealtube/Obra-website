import { PostInterface } from "./PostInterface";

export interface HistoryInterface {
  id: string;
  userId: string;
  viewed: PostInterface;
  lastDateViewed: string;
}

export interface edges {
  node: HistoryInterface;
}
