export interface PostInterface {
  _id: string;
  author?: string;
  date: string;
  art: string;
  tags: string[];
  title: string;
  likes?: number;
  comments?: string[];
  forSale?: boolean;
  forSalePrice?: string;
}
