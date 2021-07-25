import { CommentInterface } from "./CommentInterface";
import { PostInterface } from "./PostInterface";
import { UserInterface } from "./UserInterface";

export interface ReportInterface {
  id: string;
  senderId: UserInterface;
  reportedId: ReportedId;
  type: string;
  date: Date;
  title: string;
  description: string;
  reason: string;
  bugVid: string;
  vidFormat: string;
}

type ReportedId = (PostInterface & UserInterface & CommentInterface) | null;

export interface reportEdges {
  node: ReportInterface;
}

export interface Reports {
  edges: reportEdges[];
  pageInfo: PageInfo;
  totalCount: number;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}
