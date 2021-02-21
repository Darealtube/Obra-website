import {
  CssBaseline,
  Typography,
  Container,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useState } from "react";
import Appbar from "../Components/Appbar/Appbar";
import styles from "./styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import { PostInterface } from "../interfaces/PostInterface";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { POST_QUERY } from "../apollo/apolloQueries";
import { initializeApollo } from "../apollo/apolloClient";
import { fetchPosts } from "../utils/fetchData";

interface PostData {
  posts: PostInterface[];
}

type Posts = {
  data: PostData;
  loading: Boolean;
};

const Home = () => {
  const [session, loading] = useSession();
  const { data, loading: load } = useQuery(POST_QUERY) as Posts;
  const [intro, setIntro] = useState(true);
  const handleBackdrop = () => {
    setIntro(!intro);
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={styles.divider} />
        {/* Featured list */}
        {load ? "" : <CardList postData={data.posts} id={session?.id} />}

        {/* Featured list */}

        <Typography variant="h4">Recently</Typography>
        <Divider className={styles.divider} />
        {/* Recent posts list */}
        {load ? "" : <CardList postData={data.posts} id={session?.id} />}
        {/* Recent posts list */}
      </Container>
      {/* Intro dialogue */}
      <Dialog
        open={intro}
        keepMounted
        onClose={handleBackdrop}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Welcome to Canvas!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Canvas is a platform that blah blah blah blah... If you are new
            here, see the tutorial on how we do things around here. If not, you
            can go ahead and skip it. Have fun!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackdrop} color="primary">
            Skip
          </Button>
          <Button onClick={handleBackdrop} color="primary">
            Show me the way!
          </Button>
        </DialogActions>
      </Dialog>
      {/* Intro dialogue */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apollo = await fetchPosts();

  return {
    props: {
      initialApolloState: apollo,
    },
    revalidate: 60,
  };
};

export default Home;
