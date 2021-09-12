import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../apollo/apolloClient";
import { fetchReportId } from "../../utils/fetchData";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import PostReport from "../../Components/Issues/Reports/PostReport";
import CommentReport from "../../Components/Issues/Reports/CommentReport";
import BugReport from "../../Components/Issues/Reports/BugReport";
import { ReportIdData, ReportIdVars } from "../../interfaces/QueryInterfaces";
import { REPORT_ID_QUERY } from "../../apollo/Queries/reportQueries";

const DynamicDeleteDialog = dynamic(
  () => import("../../Components/Issues/DeleteDialog")
);
const DynamicReportDialog = dynamic(
  () => import("../../Components/Issues/ReportDialog")
);

const ReportID = ({ id }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [reportDialog, setreportDialog] = useState(false);
  const { data } = useQuery<ReportIdData, ReportIdVars>(REPORT_ID_QUERY, {
    variables: {
      reportedId: id,
    },
  });

  const Report = {
    id,
    email: data?.reportId?.reportedId?.author?.email
      ? data?.reportId?.reportedId?.author?.email
      : data?.reportId?.reportedId?.email,
    reason: data?.reportId?.reason,
  };

  const handleOpen = () => {
    setDeleteDialog(true);
  };

  const handleClose = () => {
    setDeleteDialog(false);
  };

  const handleReportOpen = () => {
    setreportDialog(true);
  };

  const handleReportClose = () => {
    setreportDialog(false);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Issue Details</title>
      </Head>
      {data?.reportId && data?.reportId?.type === "Post" ? (
        <PostReport
          report={data?.reportId}
          handleOpen={handleOpen}
          handleReportOpen={handleReportOpen}
        />
      ) : data?.reportId?.type === "Comment" ? (
        <CommentReport
          report={data?.reportId}
          handleOpen={handleOpen}
          handleReportOpen={handleReportOpen}
        />
      ) : data?.reportId?.type === "Bug" ? (
        <BugReport report={data?.reportId} handleOpen={handleOpen} />
      ) : (
        ""
      )}
      <DynamicReportDialog
        open={reportDialog}
        handleClose={handleReportClose}
        report={Report}
        push={true}
      />
      <DynamicDeleteDialog
        handleClose={handleClose}
        open={deleteDialog}
        targetId={id}
        push={true}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, isAdmin, exists } = await fetchReportId(
    session.id,
    context.params.id as string
  );

  if (!isAdmin || !exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session,
      id: context.params.id,
    },
  });
};

export default ReportID;
