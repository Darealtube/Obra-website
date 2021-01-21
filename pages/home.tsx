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
  Fab,
} from "@material-ui/core";
import { useState } from "react";
import Appbar from "../Components/Appbar";
import { Palette } from "@material-ui/icons";
import styles from "./styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import { PostProp } from "../interfaces/PostInterface";
import useSWR from "swr";
import fetch from "unfetch";
import auth0 from "../utils/auth0";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { UserData } from "../interfaces/UserInterface";
import fetchData from "../utils/fetchData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = ({ user }: UserData) => {
  const [intro, setIntro] = useState(true);
  const handleBackdrop = () => {
    setIntro(!intro);
  };
  const { data, error } = useSWR("api/Posts", fetcher) as PostProp;
  if (error) return <h1>Something happened, and it's terribly wrong.</h1>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Appbar userData={user} />
      <Container className={styles.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={styles.divider} />
        {/* Featured list */}
        <CardList postData={data} />
        {/* Featured list */}

        <Typography variant="h4">Recently</Typography>
        <Divider className={styles.divider} />
        {/* Recent posts list */}
        <CardList postData={data} />
        {/* Recent posts list */}
      </Container>
      {/* Intro dialogue */}
      <Dialog
        open={intro}
        keepMounted
        onClose={handleBackdrop}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
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
      {/* Link to Create page */}
      <Fab
        aria-label="Create"
        className={styles.fab}
        size="large"
        color="primary"
        href={user ? "/create" : "api/Authentication/login"}
      >
        <Palette />
      </Fab>
      {/* Link to Create page */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<UserData>> => {
  const session = await auth0.getSession(context.req);
  const user = await fetchData(session.user.sub);
  return {
    props: {
      user: user || null,
    },
  };
};

export default Home;
