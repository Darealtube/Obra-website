import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  CssBaseline,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import styles from "../../../pages/styles/General/Issues.module.css";
import Image from "next/image";
import moment from "moment";

type ReportProps = {
  report: any;
  handleReportOpen: () => void;
  handleOpen: () => void;
};

const CommentReport = ({
  report,
  handleReportOpen,
  handleOpen,
}: ReportProps) => {
  return (
    <>
      <Grid container spacing={2} style={{ height: "100vh", width: "100vw" }}>
        <Grid item xs={12} md={6} className={styles.comment}>
          <Paper elevation={6} className={styles.commentPaper}>
            <Container>
              {report.reportedId.author.name} sent this comment:
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Image
                    src={report.reportedId.author.image}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${
                    report.reportedId.author
                      ? report.reportedId.author.name
                      : "Deleted User"
                  } commented ${report.reportedId.date}`}
                  secondary={<>{report.reportedId.content}</>}
                />
              </ListItem>
              on this post:{" "}
              {`http://localhost:3000/${report.reportedId.postID}`}
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} className={styles.commentitem}>
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
                  Sent by: {report.reportedId.author.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Content: {report.reportedId.content}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Date sent: {moment(report.reportedId.date).format('MMMM Do YYYY, h:mm a')}
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
    </>
  );
};

export default CommentReport;
