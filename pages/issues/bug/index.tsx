import { Box, CssBaseline, Container } from "@material-ui/core";
import styles from "../../styles/General/Issues.module.css";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchBugReports } from "../../../utils/fetchData";
import Head from "next/head";
import IssuesWrap from "../../../Components/Issues/IssuesWrap";
import { useQuery } from "@apollo/client";
import { BUG_REPORTS_QUERY } from "../../../apollo/apolloQueries";
import BugReportList from "../../../Components/Issues/Lists/BugReportList";
import { ReportData, ReportVars } from "../../../interfaces/QueryInterfaces";

const BugReports = () => {
  const {
    data: { reports },
    fetchMore,
  } = useQuery<ReportData,ReportVars>(BUG_REPORTS_QUERY, {
    variables: {
      limit: 4,
    }, 
  });

  return (
    <div className={styles.wrapRoot}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Bug Reports</title>
      </Head>
      <CssBaseline />
      <Container>
      <IssuesWrap />
      <Box display="flex" flexDirection="column">
        <BugReportList reports={reports} fetchMore={fetchMore} />
      </Box>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, isAdmin } = await fetchBugReports(session.id);

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

export default BugReports;
