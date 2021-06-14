import { useMutation, useQuery } from "@apollo/client";
import {
  CssBaseline,
  Grid,
  Paper,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import {
  POST_REPORT_MUTATION,
  REPORT_POST_QUERY,
} from "../../../apollo/apolloQueries";
import { reasonOptions } from "../../../utils/Options";
import styles from "../../styles/Specific/Report.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

const ReportPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [reportPost] = useMutation(POST_REPORT_MUTATION);
  const [admin, setAdmin] = useState(false);
  const [report, setReport] = useState({
    description: "",
    reason: "",
  });

  const { data } = useQuery(REPORT_POST_QUERY, {
    variables: {
      id: router.query.id,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reportPost({
      variables: {
        senderId: session?.id,
        reportedPostId: router.query.id,
        date: moment().format("l"),
        title: `Post report for ${router.query.id}`,
        description: report.description,
        reason: report.reason,
      },
    });
    router.push("/home");
  };

  useEffect(() => {
    if (data) setAdmin(data?.postId.author.id == session?.id);
  }, [data, session]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Post</title>
      </Head>
      <CssBaseline />
      {data && !admin ? (
        <Container className={styles.root}>
          <Grid container className={styles.root} spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.postId.art}
                width={data?.postId.width}
                height={data?.postId.height}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper elevation={6} className={styles.paper}>
                <Container style={{ marginTop: "12px" }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Report Post
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Note: You are about to report an artist's post. Please
                    provide a sensible and a reasonable description of what
                    exactly is the cause of this report, and provide an
                    understandable reason. Reporting a post that is allowed by
                    Obra's standards will, in some cases, lead to a warning to
                    your account.
                  </Typography>

                  <Box marginTop={4}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="none"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        color="primary"
                        rows={4}
                        multiline={true}
                        rowsMax={6}
                        onChange={handleChange}
                        inputProps={{ maxLength: 500, minLength: 50 }}
                      />

                      <Box marginTop={4}>
                        <InputLabel>
                          What is the reason of this report?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={report.reason}
                          name="reason"
                          fullWidth
                          required
                          onChange={handleChange}
                        >
                          {reasonOptions.map((level, index) => (
                            <MenuItem key={index} value={level}>
                              {level}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>

                      <Box
                        marginTop={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button type="submit" variant="outlined">
                          Submit Report Issue
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Typography variant="h1">
            I'm sorry, but it doesn't make sense to report your own art.
          </Typography>
          <Link href="/">
            <Button component="a">Go back home</Button>
          </Link>
        </Container>
      )}
    </div>
  );
};

export default ReportPost;
