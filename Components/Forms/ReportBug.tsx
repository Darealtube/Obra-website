import {
  Container,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { bugOptions } from "../../utils/Options";
import { useState } from "react";
import { Box } from "@material-ui/core";
import useVideo from "../../Hooks/useVideo";
import { useSession } from "next-auth/client";
import router from "next/router";
import {
  MutationFunctionOptions,
  OperationVariables,
  FetchResult,
} from "@apollo/client";

type Prop = {
  reportBug: (
    options?: MutationFunctionOptions<any, OperationVariables>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};

const BugReportForm = ({ reportBug }: Prop) => {
  const [session] = useSession();
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

  return (
    <form onSubmit={handleBugSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box marginTop={2}>
            <Typography variant="h5" gutterBottom align="center">
              Report a Bug
            </Typography>
          </Box>

          <Box marginTop={4}>
            <Typography variant="body1">
              You are about to report a bug in the website and the opportunity
              to help Obra improve the website! Reporting a bug will help the
              website become better, and there might also be a reward for doing
              so!
            </Typography>
          </Box>
          <Box marginTop={4}>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              color="primary"
              rows={8}
              multiline={true}
              maxRows={10}
              onChange={handleChange}
            />
          </Box>
          <Box marginTop={4}>
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
          </Box>
          <Box marginTop={4}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              disabled={disabled}
            >
              Submit Bug Report
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container>
            <Typography variant="h6" paragraph gutterBottom>
              Please provide a video that shows how the bug was found or what
              the bug does that causes a problem. Make sure the video also
              specifies the location of the bug clearly.
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <input type="file" onChange={handleVideo} required />
              {!loading ? (
                <>
                  <video
                    width="100%"
                    height="320"
                    controls
                    style={{ maxHeight: "80%", marginTop: "8px" }}
                  >
                    <source
                      src={placeholder}
                      type={`video/${bugReport.format}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </form>
  );
};

export default BugReportForm;
