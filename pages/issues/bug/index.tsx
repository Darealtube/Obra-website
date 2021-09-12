import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchBugReports } from "../../../utils/fetchData";
import Head from "next/head";
import IssuesWrap from "../../../Components/Issues/IssuesWrap";
import { useQuery } from "@apollo/client";
import BugReportList from "../../../Components/Issues/Lists/BugReportList";
import { ReportData, ReportVars } from "../../../interfaces/QueryInterfaces";
import { BUG_REPORTS_QUERY } from "../../../apollo/Queries/reportQueries";
import AppWrap from "../../../Components/Appbar/AppWrap";

const BugReports = () => {
  const {
    data: { reports },
    fetchMore,
  } = useQuery<ReportData, ReportVars>(BUG_REPORTS_QUERY, {
    variables: {
      limit: 4,
    },
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Bug Reports</title>
      </Head>
      <BugReportList reports={reports} fetchMore={fetchMore} />
    </>
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

BugReports.getWrap = function wrap(page) {
  return (
    <>
      <AppWrap>
        <IssuesWrap>{page}</IssuesWrap>
      </AppWrap>
    </>
  );
};

export default BugReports;
