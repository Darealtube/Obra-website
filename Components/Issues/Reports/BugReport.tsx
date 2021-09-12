import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import { ReportInterface } from "../../../interfaces/ReportInterface";
import styles from "../../../pages/styles/General/Issues.module.css";

type ReportProps = {
  report: ReportInterface;
  handleOpen: () => void;
};

const BugReport = ({ report, handleOpen }: ReportProps) => {
  return (
    <>
      <Container className={styles.bugContainer}>
        <Grid container spacing={2} style={{ height: "100%", width: "100%" }}>
          <Grid item xs={12} className={styles.bugItem}>
            <video width="100%" height="100%" controls>
              <source src={report.bugVid} type={`video/${report.vidFormat}`} />
              Your browser does not support the video tag.
            </video>
            <Box marginTop={4}>
              <Typography variant="h4" gutterBottom>
                {report.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {report.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Report Reason: {report.reason}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} className={styles.bugItem}>
            <Container>
              <Box marginTop={4}>
                <Typography variant="h6" gutterBottom>
                  Date sent: {report.date}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Sent by: {report.senderId.name}
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BugReport;
