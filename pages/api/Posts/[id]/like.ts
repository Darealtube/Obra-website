import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { initializeApollo } from "../../../../apollo/apolloClient";
import {
  LIKE_MUTATION,
  UNLIKE_MUTATION,
} from "../../../../apollo/apolloQueries";
import User from "../../../../model/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloClient = initializeApollo();
  const session = await getSession({ req });
  if (!session) {
    res.redirect("/api/auth/signin");
  }

  const {
    query: { id },
  } = req;

  try {
    const user = await User.findOne({ name: session.user.name });

    if (user.likedPosts.includes(id)) {
      await apolloClient.mutate({
        mutation: UNLIKE_MUTATION,
        variables: {
          postId: id,
          userName: session.user.name,
        },
      });
    } else {
      await apolloClient.mutate({
        mutation: LIKE_MUTATION,
        variables: {
          postId: id,
          userName: session.user.name,
        },
      });
    }

    if (!user) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    throw error;
  }
};
