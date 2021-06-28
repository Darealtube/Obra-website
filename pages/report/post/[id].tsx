import { useQuery } from "@apollo/client";
import {
  CssBaseline,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { REPORT_POST_QUERY } from "../../../apollo/apolloQueries";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import { PostData, PostVars } from "../../../interfaces/QueryInterfaces";

const DynamicReportForm = dynamic(
  () => import("../../../Components/Forms/ReportPost")
);

const ReportPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [admin, setAdmin] = useState(false);
  const { data, loading } = useQuery<PostData, PostVars>(REPORT_POST_QUERY, {
    variables: {
      id: router.query.id as string,
    },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (data?.postId && !loading)
      setAdmin(data?.postId.author.id == session?.id);
  }, [data, session, loading]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Post</title>
      </Head>
      <CssBaseline />
      {(!data?.postId && !loading && router.query.id) ||
      (data?.postId && admin && !loading) ? (
        <DefaultErrorPage statusCode={404} />
      ) : data?.postId && !admin && !loading ? (
        <DynamicReportForm data={data?.postId} />
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
