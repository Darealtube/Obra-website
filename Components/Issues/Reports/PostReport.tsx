import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  CssBaseline,
} from "@material-ui/core";
import styles from "../../../pages/styles/General/Issues.module.css";
import Image from "next/image";

type ReportProps = {
  report: any;
  handleReportOpen: () => void;
  handleOpen: () => void;
};

const PostReport = ({ report, handleReportOpen, handleOpen }: ReportProps) => {
  return (
    <>
      <Container style={{ height: "100vh", width: "100vw" }}>
        <Grid container>
          <CssBaseline />
          <Grid item xs={12} md={6} className={styles.item}>
            <Box position="relative" height="100%" width="100%">
              <Image
                src={report.reportedId.art}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className={styles.item}>
            <Paper elevation={6} className={styles.paper}>
              <Container>
                {/* <Box display="flex" marginTop={2}>
                  <Image
                    src={report.reportedId.author.image}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <Typography variant="h6">
                    Posted by {report.reportedId.author.name} on{" "}
                    {report.reportedId.date}
                  </Typography>
                </Box>
                <Box display="flex" marginTop={2}>
                  <Image
                    src={report.senderId.image}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <Typography variant="h6">
                    Reported by {report.senderId.name} on {report.date}
                  </Typography>
                </Box> */}
                <Box marginTop={4}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Details
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Title: {report.reportedId.title}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Description: {report.reportedId.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Tags: {report.reportedId.tags.join(", ").toString()}{" "}
                  </Typography>
                </Box>

                <Box marginTop={4}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Report Details
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Report Topic: {report.title}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Report Description: {report.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Report Reason: {report.reason}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  marginTop={6}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button onClick={handleReportOpen}>Send Warning</Button>
                  <Button onClick={handleOpen}>Delete Report</Button>
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostReport;
