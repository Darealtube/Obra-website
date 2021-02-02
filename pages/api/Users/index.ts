import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import { NextApiResponse, NextApiRequest } from "next";
import auth0 from "../../../utils/auth0";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const session = await getSession({ req });
  const { method } = req;

  if (session) {
    switch (method) {
      case "GET":
        try {
          const user = await User.findOne({ name: session.user.name });

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
