// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "../../utils/dbConnect";
import Post from "../../model/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect(); // Connect to DB

  switch (method) {
    case "GET": // GET Posts
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
      break;
    case "POST": // POST to Posts collection
      try {
        const post = await Post.create(req.body); // from body (for now)
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
