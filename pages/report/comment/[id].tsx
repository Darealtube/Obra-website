import { useQuery } from "@apollo/client";
import { CssBaseline, CircularProgress, Box } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import {
  CommentIdData,
  QueryIdVars,
} from "../../../interfaces/QueryInterfaces";
import { COMMENT_ID_QUERY } from "../../../apollo/Queries/postQueries";

const DynamicReportForm = dynamic(
  () => import("../../../Components/Forms/ReportComment")
);

const ReportPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [admin, setAdmin] = useState(false);
  const { data, loading } = useQuery<CommentIdData, QueryIdVars>(
    COMMENT_ID_QUERY,
    {
      variables: {
        id: router.query.id as string,
      },
      skip: !router.query.id,
    }
  );

  useEffect(() => {
    if (data?.commentId && !loading)
      setAdmin(data?.commentId.author.id == session?.id);
  }, [data, session, loading]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Comment</title>
      </Head>
      <CssBaseline />
      {(!data?.commentId && !loading && router.query.id) ||
      (data?.commentId && admin && !loading) ? (
        <DefaultErrorPage statusCode={404} />
      ) : data?.commentId && !admin && !loading ? (
        <DynamicReportForm data={data?.commentId} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default ReportPost;
