import CommissionWrap from "../../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { YOUR_COMMISSIONS_QUERY } from "../../../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import YourCommList from "../../../Components/Commissions/Lists/YourCommList";
import {
  CommissionData,
  CommissionVars,
} from "../../../interfaces/QueryInterfaces";

const YourCommissions = () => {
  const [session] = useSession();
  const { data, fetchMore, loading } = useQuery<CommissionData, CommissionVars>(
    YOUR_COMMISSIONS_QUERY,
    {
      variables: {
        id: session?.id,
      },
      skip: !session,
    }
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Your Commissions</title>
      </Head>
      <CssBaseline />
      <CommissionWrap>
        {data && !loading && (
          <YourCommList
            yourCommissions={data.userId.yourCommissions}
            fetchMore={fetchMore}
          />
        )}
      </CommissionWrap>
    </>
  );
};

export default YourCommissions;
