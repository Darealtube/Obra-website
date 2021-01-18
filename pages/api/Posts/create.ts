import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "../../utils/dbConnect";
import Post from "../../model/Post";
import User from "../../model/User";
import auth0 from "../../utils/auth0";

export default auth0.requireAuthentication(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth0.getSession(req);
  await dbConnect(); // Connect to DB
  try {
    const post = await Post.create(req.body); // from body (for now)

    await User.findOneAndUpdate(
      { sub: session.user.sub },
      // @ts-ignore
      { $push: { posts: post._id } }
    );
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});
