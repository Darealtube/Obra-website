import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import { NextApiResponse, NextApiRequest } from "next";
import auth0 from "../../../utils/auth0";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const session = await auth0.getSession(req);
  const { method } = req;

  if (session) {
    switch (method) {
      case "GET":
        try {
          const user = await User.findOne({ sub: session.user.sub });

          if (!user) {
            return res.status(400).json({ success: false });
          }

          return res.status(200).json(user);
        } catch (error) {
          throw error;
        }
    }
  } else {
    return res.status(200).json(null);
  }
};
