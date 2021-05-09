import CommissionWrap from "../../Components/Commissions/CommissionWrap";
import Head from "next/head";
import { CssBaseline, Typography } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { COMMISSION_ID_QUERY } from "../../apollo/apolloQueries";
import CommissionData from "../../Components/Commissions/CommissionData";
import { useRouter } from "next/router";
import {
  CommissionIdData,
  CommissionIdVars,
} from "../../interfaces/QueryInterfaces";

const CommissionID = () => {
  const router = useRouter();
  const { data, loading } = useQuery<CommissionIdData, CommissionIdVars>(
    COMMISSION_ID_QUERY,
    {
      variables: {
        id: router.query.id as string,
      },
    }
  );

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
    </>
  );
};

export default CommissionID;
