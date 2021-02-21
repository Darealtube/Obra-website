import { UserInterface } from "./UserInterface";

export interface PostInterface {
  id: string;
  author?: UserInterface;
  picture?: string;
  date: string;
  art: string;
  tags: string[];
  title: string;
  description: string;
  sale?: string;
  price: string;
  likes?: number;
  comments?: string[];
  forSale?: boolean;
  forSalePrice?: string;
}

export interface PostProp {
  // General useSWR
  data: PostInterface[];
  error?: string;
}

export interface PostPropId {
  // Specific useSWR
  data: PostInterface;
  error?: string;
}
