import { NextApiResponse, NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { initializeApollo } from "../../../apollo/apolloClient";
import { APPBAR_USER_QUERY } from "../../../apollo/apolloQueries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: APPBAR_USER_QUERY,
    variables: {
      name: session.user.name,
    },
  });
  if (!data) {
    return null;
  }
  return res.status(200).json(data.userId);
};
