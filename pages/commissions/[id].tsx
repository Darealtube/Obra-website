import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { COMMISSION_ID_QUERY } from "../../apollo/apolloQueries";
import CommissionData from "../../Components/Commissions/CommissionData";
import { useRouter } from "next/router";
import {
  CommissionIdData,
  CommissionIdVars,
} from "../../interfaces/QueryInterfaces";
import { useState } from "react";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

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
  const { data, loading } = useQuery<CommissionIdData, CommissionIdVars>(
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

    if (
      !noSess &&
      (session.id != data?.commissionId.fromUser.id ||
        session.id != data?.commissionId.toArtist.id)
    ) {
      setnotAllowed(true);
    }
  }, [session, sessload, data, noSess]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission</title>
      </Head>
      <CssBaseline />
      <CommissionWrap>
        {data && !loading ? (
          <CommissionData commission={data.commissionId} />
        ) : (
          ""
        )}
      </CommissionWrap>
      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

export default CommissionID;
