import dbConnect from "../../utils/dbConnect";
import User from "../../model/User";
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
        const user = await User.findById(id);
        user._id = user._id.toString();

        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json(user);
      } catch (error) {
        throw error;
      }
      break;
    case "UPDATE":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        throw error;
      }
      break;
  }
};
