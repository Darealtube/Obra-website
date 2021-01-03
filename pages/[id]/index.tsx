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
} from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grid: {
      height: "100vh",
      position: "relative",
    },
    artContainer: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      height: "80%",
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
      justifyContent: "center",
      alignItems: "center",
      background: "blue",
    },
    recommended: {
      marginTop: theme.spacing(10),
    },
    card: {
      width: "20em",
    },
    recommendedList: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
  })
);

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostID = ({ post, recommendedPosts }) => {
  const router = useRouter();
  const url = `http://localhost:3000/api/Posts/${router.query.id}`;
  const classes = useStyles();
  const { data: postId, error } = useSWR(url, fetcher, {
    initialData: post,
  });
  if (error) return <h1>Something went wrong!</h1>;
  if (!postId) return <h1>Loading...</h1>;

  console.log(recommendedPosts);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        <Grid item xs={8} className={classes.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6} className={classes.artContainer}>
                {postId.art && (
                  <Image src={postId.art} width={800} height={800} />
                )}
              </Grid>
              <Grid item xs={6} className={classes.information}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">{postId.title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Author</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      {postId.sale === "No"
                        ? "Showcase only"
                        : "₱" + postId.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {postId.tags.map((tag) => {
                      <Chip label={tag} className={classes.tag}></Chip>;
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {postId.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button>LIKE</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button>ADD</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button>SHARE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={4} className={classes.recommended} spacing={2}>
          <Container>
            <Typography variant="h4">Recommended List</Typography>
            <Divider />
            <Grid container className={classes.recommendedList}></Grid>
          </Container>
        </Grid>
      </Grid>
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
