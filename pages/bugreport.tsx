import styles from "./styles/Specific/BugReport.module.css";
import {
  Box,
  Container,
  Grid,
  TextField,
  Select,
  InputLabel,
  Button,
  MenuItem,
} from "@material-ui/core";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import BugReportForm from "../Components/Forms/ReportBug";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ReportVars } from "../interfaces/MutationInterfaces";
import { REPORT_MUTATION } from "../apollo/Mutations/reportMutation";
import useVideo from "../Hooks/useVideo";
import { useRouter } from "next/router";
import { bugOptions } from "../utils/Options";

const DynamicNoSessDialog = dynamic(
  () => import("../Components/MainPopovers/NoSessionDialog")
);

const BugReport = () => {
  const router = useRouter();
  const [reportBug] = useMutation<boolean, ReportVars>(REPORT_MUTATION);
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const [bugReport, setbugReport] = useState({
    description: "",
    reason: "",
    video: "",
    format: "",
  });
  const [disabled, setDisabled] = useState(false);
  const { loading, placeholder, setVideo } = useVideo("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbugReport({
      ...bugReport,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((e.target as HTMLInputElement).files).then((values) => {
      setbugReport({
        ...bugReport,
        video: values.url,
        format: values.format,
      });
    });
  };

  const handleBugSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    reportBug({
      variables: {
        senderId: session?.id,
        type: "Bug",
        description: bugReport.description,
        reason: bugReport.reason,
        bugVid: bugReport.video,
        vidFormat: bugReport.format,
      },
    });
    router.push("/");
  };

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

  console.log(bugReport);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Bug</title>
      </Head>
      <Container>
        <form onSubmit={handleBugSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BugReportForm
                bugReport={bugReport}
                loading={loading}
                placeholder={placeholder}
                handleVideo={handleVideo}
              />
            </Grid>
            <Grid item xs={12} className={styles.formItem}>
              <Box width="50%" className={styles.formBoxes} marginRight={2}>
                <TextField
                  variant="outlined"
                  margin="none"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  color="primary"
                  multiline={true}
                  rows={10}
                  onChange={handleChange}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                width="50%"
                className={styles.formBoxes}
              >
                <InputLabel>What is the reason of this report?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bugReport.reason}
                  name="reason"
                  fullWidth
                  required
                  onChange={handleChange}
                >
                  {bugOptions.map((level, index) => (
                    <MenuItem key={index} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  disabled={disabled}
                  sx={{ marginTop: "16px" }}
                >
                  Submit Bug Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
      <DynamicNoSessDialog open={noSess} />
    </>
  );
};

export default BugReport;
