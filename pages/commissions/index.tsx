import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { PENDING_COMMS_QUERY } from "../../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import PendingList from "../../Components/Commissions/Lists/PendingList";
import {
  CommissionData,
  CommissionVars,
} from "../../interfaces/QueryInterfaces";

const Commissions = () => {
  const [session] = useSession();
  const { data, fetchMore, loading } = useQuery<CommissionData, CommissionVars>(
    PENDING_COMMS_QUERY,
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
        <title>Commissions</title>
      </Head>
      <CssBaseline />
      <CommissionWrap>
        {data && !loading && (
          <PendingList
            pendingCommissions={data.userId.pendingCommissions}
            fetchMore={fetchMore}
          />
        )}
      </CommissionWrap>
    </>
  );
};

export default Commissions;
