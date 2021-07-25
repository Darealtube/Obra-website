import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { PENDING_COMMS_QUERY } from "../../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import PendingList from "../../Components/Commissions/Lists/PendingList";
import {
  CommissionData, QueryIdVars,
} from "../../interfaces/QueryInterfaces";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicNoSessDialog = dynamic(
  () => import("../../Components/MainPopovers/NoSessionDialog")
);

const Commissions = () => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const { data, fetchMore, loading } = useQuery<CommissionData, QueryIdVars>(
    PENDING_COMMS_QUERY,
    {
      variables: {
        id: session?.id,
        limit: 4,
      },
      skip: !session,
    }
  );

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

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
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

export default Commissions;
