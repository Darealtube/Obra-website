import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../model/User";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const {
    query: { name },
    method,
  } = req;

  try {
    const user = await User.findOne({ name: name });

    if (!user) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};
