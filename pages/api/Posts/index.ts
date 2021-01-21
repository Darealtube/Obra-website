// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "../../../utils/dbConnect";
import Post from "../../../model/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect(); // Connect to DB
  try {
    const result = await Post.find({});
    const posts = result.map((data) => {
      const post = data.toObject();
      post._id = post._id.toString();
      return post;
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
