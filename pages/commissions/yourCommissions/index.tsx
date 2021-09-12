import CommissionWrap from "../../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import YourCommList from "../../../Components/Commissions/Lists/YourCommList";
import {
  CommissionData,
  QueryIdVars,
} from "../../../interfaces/QueryInterfaces";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { YOUR_COMMISSIONS_QUERY } from "../../../apollo/Queries/commsQueries";
import AppWrap from "../../../Components/Appbar/AppWrap";

const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);

const YourCommissions = () => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const { data, fetchMore, loading } = useQuery<CommissionData, QueryIdVars>(
    YOUR_COMMISSIONS_QUERY,
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
      {data && !loading && (
        <YourCommList
          yourCommissions={data.userId.yourCommissions}
          fetchMore={fetchMore}
        />
      )}
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

YourCommissions.getWrap = function wrap(page) {
  return (
    <>
      <AppWrap>
        <CommissionWrap>{page}</CommissionWrap>
      </AppWrap>
    </>
  );
};

export default YourCommissions;
