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
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import { addApolloState } from "../../../apollo/apolloClient";
import { POST_REPORT_MUTATION, REPORT_POST_QUERY } from "../../../apollo/apolloQueries";
import { fetchAllPosts, fetchReportedPost } from "../../../utils/fetchData";
import { reasonOptions } from "../../../utils/Options";
import styles from "../../styles/Specific/Report.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

const ReportPost = ({ id }) => {
  const router = useRouter();
  const [session] = useSession();
  const [reportPost] = useMutation(POST_REPORT_MUTATION)
  const [report, setReport] = useState({
    description: "",
    reason: "",
  })

  const {
    data: { postId },
  } = useQuery(REPORT_POST_QUERY, {
    variables: {
      id: id,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReport({
      ...report,
      [(e.target.name)]: e.target.value,
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    reportPost({
      variables:{
        senderId: session?.id,
        reportedPostId: id,
        date: moment().format("l"),
        title: `Post report for ${id}`,
        description: report.description,
        reason: report.reason,
      }
    })
    router.push('/home');
  }

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Report Post</title>
      </Head>
      <CssBaseline />
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
              src={postId.art}
              width={postId.width}
              height={postId.height}
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
              <Container style={{marginTop: "12px"}}>
                <Typography variant="h4" align="center" gutterBottom>
                  Report Post
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Note: You are about to report an artist's post. Please provide
                  a sensible and a reasonable description of what exactly is the
                  cause of this report, and provide an understandable reason.
                  Reporting a post that is allowed by Obra's standards will, in
                  some cases, lead to a warning to your account.
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

                    <Box marginTop={4} display="flex" justifyContent="center" alignItems="center">
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
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllPosts();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((id) => ({
    params: { id: id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, exists } = await fetchReportedPost(context.params.id);

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      id: context.params.id,
    },
  });
};

export default ReportPost;
