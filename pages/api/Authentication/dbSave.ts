import { NextApiResponse, NextApiRequest } from "next";
import auth0 from "../../../utils/auth0";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const session = await auth0.getSession(req);
    const userExist = await User.find({ sub: session.user.sub });
    if (userExist.length <= 0) {
      await User.create(session.user);
      res.status(201).redirect("/home");
    }
    res.status(201).redirect("/home");
  }
);
