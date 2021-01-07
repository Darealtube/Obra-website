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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Fab,
  Chip,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { useState } from "react";
import Appbar from "./Components/Appbar";
import { Palette } from "@material-ui/icons";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dbConnect from "./utils/dbConnect";
import Post from "./model/Post";
import Link from "next/link";
import styles from "./styles/General/Home.module.css";
import { CardList } from "./Components/CardList";
import { PostInterface } from "./interfaces/PostInterface";

interface PostData {
  posts: PostInterface[];
}

const Home = ({ posts }: PostData) => {
  const [intro, setIntro] = useState(true);
  const handleBackdrop = () => {
    setIntro(!intro);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Appbar /> {/* Appbar */}
      <Container className={styles.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={styles.divider} />
        {/* Featured list */}
        <Grid container spacing={4} className={styles.feature}>
          {posts &&
            posts.map((post) => (
              <Grid item key={post._id}>
                <Card className={styles.card}>
                  <CardHeader
                    avatar={<Avatar aria-label="User">D</Avatar>}
                    title="Author"
                    subheader={post.date}
                  />

                  <CardMedia
                    component="img"
                    alt="Featured Art No.1"
                    height="140"
                    image={post.art}
                    title="Featured Art No.1"
                  />
                  <Link href={`/${post._id}`}>
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={styles.title}
                        >
                          {post.title}
                        </Typography>
                        <br />
                        {post.tags.map((tag) => (
                          <Chip label={tag} className={styles.tag} />
                        ))}
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        {/* Featured list */}
        <Divider className={styles.divider} />
        <Typography variant="h4">Recently</Typography>
        {/* Recent posts list */}
        <Grid container spacing={4} className={styles.feature}>
          {posts &&
            posts.map((post) => (
              <Grid item key={post._id}>
                <Card className={styles.card}>
                  <CardHeader
                    avatar={<Avatar aria-label="User">D</Avatar>}
                    title="Author"
                    subheader={post.date}
                  />

                  <CardMedia
                    component="img"
                    alt="Featured Art No.1"
                    height="140"
                    image={post.art}
                    title="Featured Art No.1"
                  />
                  <Link href={`/${post._id}`}>
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={styles.title}
                        >
                          {post.title}
                        </Typography>
                        <br />
                        {post.tags.map((tag) => (
                          <Chip label={tag} className={styles.tag} />
                        ))}
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
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
        href="/create"
      >
        <Palette />
      </Fab>
      {/* Link to Create page */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<PostData>> => {
  await dbConnect();
  /* find all the data in our database */
  const result = await Post.find({});
  const posts = result.map((data) => {
    const post = data.toObject();
    post._id = post._id.toString();
    return post;
  });
  return { props: { posts: posts }, revalidate: 1 };
};

export default Home;
