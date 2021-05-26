import CommissionWrap from "../../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { YOUR_PENDING_COMMS_QUERY } from "../../../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import PendingCommList from "../../../Components/Commissions/Lists/PendingCommList";
import {
  CommissionData,
  CommissionVars,
} from "../../../interfaces/QueryInterfaces";

const YourPendingCommissions = () => {
  const [session] = useSession();
  const { data, fetchMore, loading } = useQuery<CommissionData, CommissionVars>(
    YOUR_PENDING_COMMS_QUERY,
    {
      variables: {
        id: session?.id,
        limit: 4,
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
          <PendingCommList
            yourPendingCommissions={data.userId.yourPendingCommissions}
            fetchMore={fetchMore}
          />
        )}
      </CommissionWrap>
    </>
  );
};

export default YourPendingCommissions;
