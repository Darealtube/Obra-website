import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../Appbar/AppWrap";

type bugReport = {
  description: string;
  reason: string;
  video: string;
  format: string;
};

type Prop = {
  loading: boolean;
  placeholder: string;
  handleVideo: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  bugReport: bugReport;
};

const BugReportForm = ({
  loading,
  placeholder,
  handleVideo,
  bugReport,
}: Prop) => {
  const drawerOpen = useContext(AppContext);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={drawerOpen ? 12 : 6} xl={6}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Report a Bug
          </Typography>

          <Typography variant="body1" paragraph gutterBottom>
            You are about to report a bug in the website and the opportunity to
            help Obra improve the website! Reporting a bug will help the website
            become better, and there might also be a reward for doing so!
          </Typography>

          <Typography variant="h6" paragraph gutterBottom>
            Please provide a video that shows how the bug was found or what the
            bug does that causes a problem. Make sure the video also specifies
            the location of the bug clearly.
          </Typography>

          <input type="file" onChange={handleVideo} required />
        </Container>
      </Grid>
      <Grid item xs={12} md={drawerOpen ? 12 : 6}  xl={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {!loading ? (
            <>
              <video
                width="100%"
                height="50%"
                controls
                style={{ maxHeight: "80%", marginTop: "8px" }}
              >
                <source src={placeholder} type={`video/${bugReport.format}`} />
                Your browser does not support the video tag.
              </video>
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default BugReportForm;
