import { useQuery } from "@apollo/client";
import {
  CssBaseline,
  CircularProgress,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { REPORT_POST_QUERY } from "../../../apollo/apolloQueries";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReportForm from "../../../Components/Forms/ReportPost";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicReportForm = dynamic(
  () => import("../../../Components/Forms/ReportPost")
);

const ReportPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [admin, setAdmin] = useState(false);
  const { data, loading } = useQuery(REPORT_POST_QUERY, {
    variables: {
      id: router.query.id,
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
      {data?.postId && !admin ? (
        <DynamicReportForm data={data?.postId} />
      ) : loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
        >
          <CircularProgress />
        </Box>
      ) : data?.postId && admin ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          flexDirection="column"
        >
          <Typography variant="h6" align="center">
            Sorry, but it doesn&apos;t make sense to report your own art.
          </Typography>
          <Link href="/" passHref>
            <Button component="a">Go back home</Button>
          </Link>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          flexDirection="column"
        >
          <Typography variant="h6" align="center">
            This post either does not exist or has been deleted by the author.
          </Typography>
          <Link href="/" passHref>
            <Button component="a">Go back home</Button>
          </Link>
        </Box>
      )}
    </div>
  );
};

export default ReportPost;
