import { Box, CssBaseline, Container } from "@material-ui/core";
import styles from "../../styles/General/Issues.module.css";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchCommentReports } from "../../../utils/fetchData";
import Head from "next/head";
import IssuesWrap from "../../../Components/Issues/IssuesWrap";
import { useQuery } from "@apollo/client";
import { REPORTED_COMMENTS_QUERY } from "../../../apollo/apolloQueries";
import ReportList from "../../../Components/Issues/Lists/ReportList";

const CommentIssues = () => {
  const {
    data: { reports },
    fetchMore,
  } = useQuery(REPORTED_COMMENTS_QUERY, {
    variables: {
      limit: 4,
    },
  });

  return (
    <div className={styles.wrapRoot}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Comment Issues</title>
      </Head>
      <CssBaseline />
      <Container>
      <IssuesWrap />
      <Box display="flex" flexDirection="column">
        <ReportList reports={reports} fetchMore={fetchMore} />
      </Box>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, isAdmin } = await fetchCommentReports(session.id);

  if (!isAdmin) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session,
    },
  });
};

export default CommentIssues;
