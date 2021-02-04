import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Post from "../../../../model/Post";
import User from "../../../../model/User";
import dbConnect from "../../../../utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    res.redirect("/api/auth/signin");
  }

  const {
    query: { id },
  } = req;

  try {
    const post = await Post.findById(id);
    const user = await User.findOne({ name: session.user.name });
    if (user.likedPosts.includes(post._id)) {
      await User.findOneAndUpdate(
        { name: session.user.name },
        { $pull: { likedPosts: post._id } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await User.findOneAndUpdate(
        { name: session.user.name },
        { $push: { likedPosts: post._id } },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (!post || !user) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    throw error;
  }
};
