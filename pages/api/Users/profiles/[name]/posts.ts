// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "../../../../../utils/dbConnect";
import Post from "../../../../../model/Post";
import User from "../../../../../model/User";
import auth0 from "../../../../../utils/auth0";
import { UserInterface } from "../../../../../interfaces/UserInterface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(); // Connect to DB
  const {
    query: { name },
  } = req;
  try {
    const result = await Post.find({});
    const user = await User.findOne({ name: name });
    // const posts = result.map((data) => {
    //  const post = data.toObject();
    //  post._id = post._id.toString();
    //  return post;
    // });

    if (user.posts.length <= 0) {
      res.status(200).json({ message: "Nothing." });
    }

    const userPosts = result
      .map((post) => {
        return post.toObject();
      })
      .filter((post) => {
        return user.posts.includes(post._id);
      });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
