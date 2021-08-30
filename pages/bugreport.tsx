import styles from "./styles/Specific/BugReport.module.css";
import { Paper, Container, CssBaseline } from "@material-ui/core";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import BugReportForm from "../Components/Forms/ReportBug";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ReportVars } from "../interfaces/MutationInterfaces";
import { REPORT_MUTATION } from "../apollo/Mutations/reportMutation";

const DynamicNoSessDialog = dynamic(
  () => import("../Components/MainPopovers/NoSessionDialog")
);

const BugReport = () => {
  const [reportBug] = useMutation<boolean, ReportVars>(REPORT_MUTATION);
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Bug</title>
      </Head>
      <CssBaseline />
      <Paper className={styles.paper}>
        <Container>
          <BugReportForm reportBug={reportBug} />
        </Container>
      </Paper>
      <DynamicNoSessDialog open={noSess} />
    </div>
  );
};

export default BugReport;
