import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline, Box } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { COMMISSION_ID_QUERY } from "../../apollo/apolloQueries";
import CommissionData from "../../Components/Commissions/CommissionData";
import { useRouter } from "next/router";
import {
  CommissionIdData, QueryIdVars,
} from "../../interfaces/QueryInterfaces";
import { useState } from "react";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@material-ui/core";
import DefaultErrorPage from "next/error";

const DynamicNotAllowedDialog = dynamic(
  () => import("../../Components/MainPopovers/NoAccessDialog")
);
const DynamicNoSessDialog = dynamic(
  () => import("../../Components/MainPopovers/NoSessionDialog")
);

const CommissionID = () => {
  const router = useRouter();
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const [notAllowed, setnotAllowed] = useState(false);
  const { data, loading } = useQuery<CommissionIdData, QueryIdVars>(
    COMMISSION_ID_QUERY,
    {
      variables: {
        id: router.query.id as string,
      },
      skip: !session,
    }
  );

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }

    if (data?.commissionId) {
      let allowed = session?.id == data?.commissionId?.toArtist.id;
      let allowed2 = session?.id == data?.commissionId?.fromUser.id;

      if (!noSess && !loading && !allowed && !allowed2) {
        setnotAllowed(true);
      }
    }
  }, [session, sessload, data, noSess, loading]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission</title>
      </Head>
      <CssBaseline />
      {!data?.commissionId && !sessload && !loading ? (
        <>
          <DefaultErrorPage statusCode={404} />
        </>
      ) : data?.commissionId && !loading && !noSess && !notAllowed ? (
        <CommissionWrap>
          <CommissionData
            commission={data.commissionId}
          />
        </CommissionWrap>
      ) : (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

export default CommissionID;
