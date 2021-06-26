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
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);

const YourPendingCommissions = () => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
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

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

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
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

export default YourPendingCommissions;
