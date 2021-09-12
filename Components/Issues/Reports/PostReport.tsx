import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import styles from "../../../pages/styles/General/Issues.module.css";
import Image from "next/image";
import { ReportInterface } from "../../../interfaces/ReportInterface";
import { useContext } from "react";
import { AppContext } from "../../Appbar/AppWrap";

type ReportProps = {
  report: ReportInterface;
  handleReportOpen: () => void;
  handleOpen: () => void;
};

const PostReport = ({ report, handleReportOpen, handleOpen }: ReportProps) => {
  const drawerOpen = useContext(AppContext);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={drawerOpen ? 12 : 6}
            className={styles.item}
            sx={{
              background: `url(${report.reportedId.art}) no-repeat`,
              backgroundSize: "cover",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              height="100%"
              width="100%"
              sx={{ backdropFilter: "blur(10px)" }}
            >
              <Image
                src={report.reportedId.art}
                layout="fill"
                objectFit="contain"
                alt={"Author Image"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={drawerOpen ? 12 : 6} className={styles.item}>
            <Paper elevation={6} className={styles.paper}>
              <Container>
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
                    Tags:{" "}
                    {report.reportedId.tags
                      .map((tag) => tag.name)
                      .join(", ")
                      .toString()}{" "}
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
