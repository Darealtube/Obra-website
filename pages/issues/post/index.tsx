import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchPostReports } from "../../../utils/fetchData";
import Head from "next/head";
import IssuesWrap from "../../../Components/Issues/IssuesWrap";
import { useQuery } from "@apollo/client";
import ReportList from "../../../Components/Issues/Lists/ReportList";
import { ReportData, ReportVars } from "../../../interfaces/QueryInterfaces";
import { REPORTED_POSTS_QUERY } from "../../../apollo/Queries/reportQueries";
import AppWrap from "../../../Components/Appbar/AppWrap";

const PostIssues = () => {
  const {
    data: { reports },
    fetchMore,
  } = useQuery<ReportData, ReportVars>(REPORTED_POSTS_QUERY, {
    variables: {
      limit: 4,
    },
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Post Issues</title>
      </Head>
      <ReportList reports={reports} fetchMore={fetchMore} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, isAdmin } = await fetchPostReports(session ? session.id : null);

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

PostIssues.getWrap = function wrap(page) {
  return (
    <>
      <AppWrap>
        <IssuesWrap>{page}</IssuesWrap>
      </AppWrap>
    </>
  );
};

export default PostIssues;
