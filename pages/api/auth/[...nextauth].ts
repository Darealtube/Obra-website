import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../model/User";
import dbConnect from "../../../utils/dbConnect";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID_2,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_2,
    }),
    /* Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }), */
    Providers.Email({
      server: {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.MONGODB_URI,
  secret: process.env.AUTH_CLIENT_SECRET,
  callbacks: {
    signIn: async (user, account, profile) => {
      /* await dbConnect();
      const data = await User.findById(user.id);
      if (data) {
        await User.findByIdAndUpdate(
          user.id,
          { newUser: false, tutorial: data.tutorial ? true : false },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        await User.findByIdAndUpdate(
          user.id,
          { newUser: true, tutorial: data.tutorial ? true : false },
          {
            new: true,
            runValidators: true,
          }
        );
      } */
      return Promise.resolve(true);
    },
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/configure",
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
