import { ApolloServer } from "apollo-server-micro";
import dbConnect from "../../../utils/dbConnect";
import { schema } from "../../../apollo/schema";

const apolloServer = new ApolloServer({
  schema,
  context: dbConnect(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/Apollo/graphql" });
