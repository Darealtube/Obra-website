import dbConnect from "../../utils/dbConnect";
import Post from "../../model/Post";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id).lean();
        post._id = post._id.toString();

        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json(post);
      } catch (error) {
        throw error;
      }
      break;
    case "UPDATE":
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        throw error;
      }
      break;

    case "LIKE":
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!post) {
          return res.status(400).json({ success: false });
        }

        post.save();
      } catch (error) {
        throw error;
      }
      break;
  }
};
