import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "../../../utils/dbConnect";
import Post from "../../../model/Post";
import User from "../../../model/User";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(); // Connect to DB
  const session = await getSession({ req });
  if (!session) {
    res.redirect("/api/auth/signin");
  }

  try {
    const post = await Post.create(req.body); // from body (for now)

    await User.findOneAndUpdate(
      { name: session.user.name },
      // @ts-ignore
      { $push: { posts: post._id } }
    );
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
