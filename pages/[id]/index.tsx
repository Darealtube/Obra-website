import { GetStaticProps, GetStaticPaths } from "next";
import dbConnect from "../utils/dbConnect";
import Post from "../model/Post";
import Appbar from "../Components/Appbar";
import useSWR from "swr";
import {
  Theme,
  makeStyles,
  CssBaseline,
  createStyles,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  Chip,
  Button,
  Container,
  CardActions,
  Divider,
  Dialog,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SkeletonPost from "../Components/idSkeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grid: {
      height: "100%",
      position: "relative",
    },
    artContainer: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 500,
      height: 500,
      background: "black",
    },
    appBarSpacer: theme.mixins.toolbar,
    information: {
      display: "flex",
      flexDirection: "column",
    },
    tag: {
      marginRight: theme.spacing(0.2),
    },
    postInfo: {
      display: "flex",
      position: "relative",
      justifyContent: "flex-start",
      marginTop: theme.spacing(10),
    },
    recommended: {
      marginTop: theme.spacing(10),
    },
    card: {
      width: "20em",
      marginBottom: theme.spacing(2),
    },
    recommendedList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
    dialog: {
      width: "100em",
      Height: "100em",
      position: "relative",
    },
  })
);

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostID = ({ recommendedPosts }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const url = `http://localhost:3000/api/Posts/${router.query.id}`;
  const classes = useStyles();
  const { data: postId, error } = useSWR(url, fetcher);
  if (error) return <h1>Something went wrong!</h1>;
  if (!postId) return <SkeletonPost />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        <Grid item lg={8} className={classes.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} className={classes.artContainer}>
                {postId.art && (
                  <Image
                    src={postId.art}
                    layout="fill"
                    objectFit="contain"
                    onClick={() => setOpen(true)}
                  />
                )}
              </Grid>
              <Grid item lg={6} className={classes.information}>
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <Typography variant="h4" style={{ wordWrap: "break-word" }}>
                      {postId.title}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="subtitle1">Author</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">
                      {postId.sale === "No"
                        ? "Showcase only"
                        : "₱" + postId.price}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    {postId.tags.map((tag) => {
                      <Chip label={tag} className={classes.tag}></Chip>;
                    })}
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="body1"
                      style={{ wordWrap: "break-word" }}
                    >
                      {postId.description}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Button>LIKE</Button>
                  </Grid>
                  <Grid item lg={4}>
                    <Button>ADD</Button>
                  </Grid>
                  <Grid item lg={4}>
                    <Button>SHARE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="h2">Comments</Typography>
            <Typography></Typography>
          </Container>
        </Grid>
        <Grid item lg={4} className={classes.recommended}>
          <Container>
            <Typography variant="h4">Recommended List</Typography>
            <Divider />
            <Container className={classes.recommendedList}>
              {recommendedPosts &&
                recommendedPosts.map((post) => (
                  <Card className={classes.card} key={post._id}>
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
                          <Typography variant="h6" color="textSecondary">
                            {post.title}
                          </Typography>
                          <br />
                          {post.tags.map((tag) => (
                            <Chip label={tag} className={classes.tag} />
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
                ))}
            </Container>
          </Container>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Container className={classes.dialog}>
          <Image src={postId.art} layout="fill" objectFit="contain" />
        </Container>
      </Dialog>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();
  const result = await Post.findById(context.params.id).lean();
  const recommended = await Post.find({});
  const recommendedPosts = recommended.map((data) => {
    const post = data.toObject();
    post._id = post._id.toString();
    return post;
  });
  result._id = result._id.toString();
  return { props: { post: result, recommendedPosts } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const result = await Post.find({});
  const paths = result.map((post) => {
    return { params: { id: post._id.toString() } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export default PostID;
