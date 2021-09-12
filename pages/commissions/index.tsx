import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { Box, CircularProgress, CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import { CommissionData, QueryIdVars } from "../../interfaces/QueryInterfaces";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CommissionList from "../../Components/Commissions/Lists/CommissionList";
import { COMMISSIONS_QUERY } from "../../apollo/Queries/commsQueries";
import AppWrap from "../../Components/Appbar/AppWrap";

const DynamicNoSessDialog = dynamic(
  () => import("../../Components/MainPopovers/NoSessionDialog")
);

const Commissions = () => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const { data, fetchMore, loading } = useQuery<CommissionData, QueryIdVars>(
    COMMISSIONS_QUERY,
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
      {data?.userId && !loading ? (
        <CommissionList
          commissions={data?.userId.commissions}
          fetchMore={fetchMore}
        />
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

Commissions.getWrap = function wrap(page) {
  return (
    <>
      <AppWrap>
        <CommissionWrap>{page}</CommissionWrap>
      </AppWrap>
    </>
  );
};

export default Commissions;
