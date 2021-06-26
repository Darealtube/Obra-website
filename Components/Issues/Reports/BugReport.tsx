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

type ReportProps = {
  report: any;
  handleOpen: () => void;
};

const BugReport = ({ report, handleOpen }: ReportProps) => {
  return (
    <>
      <Container className={styles.bugContainer}>
        <Grid container spacing={2} style={{height: "100%", width: "100%"}}>
          <Grid item xs={12} md={6} className={styles.bugItem}>
            <video width="100%" height="320" controls>
              <source src={report.bugVid} type={`video/${report.vidFormat}`} />
              Your browser does not support the video tag.
            </video>
          </Grid>
          <Grid item xs={12} md={6} className={styles.bugItem}>
            <Paper elevation={6}>
              <Container>
                <Box marginTop={4}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Details
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Date sent: {report.date}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Sent by: {report.senderId.name}
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
                  <Button onClick={handleOpen}>Delete Bug Report</Button>
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BugReport;
