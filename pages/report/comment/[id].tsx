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
import {
  COMMENT_ID_QUERY,
  REPORT_POST_QUERY,
} from "../../../apollo/apolloQueries";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicReportForm = dynamic(
  () => import("../../../Components/Forms/ReportComment")
);

const ReportPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [admin, setAdmin] = useState(false);
  const { data, loading } = useQuery(COMMENT_ID_QUERY, {
    variables: {
      id: router.query.id,
    },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (data?.commentId && !loading)
      setAdmin(data?.commentId.author.id == session?.id);
  }, [data, session, loading]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Post</title>
      </Head>
      <CssBaseline />
      {data?.commentId && !admin ? (
        <DynamicReportForm data={data?.commentId} />
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
      ) : data?.commentId && admin ? (
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
