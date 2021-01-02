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
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    grid: {
      height: "100vh",
    },
  })
);

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostID = ({ post }) => {
  const router = useRouter();
  const url = `http://localhost:3000/api/Posts/${router.query.id}`;
  const classes = useStyles();
  const { data: postId, error } = useSWR(url, fetcher);
  if (error) return <h1>Something went wrong!</h1>;
  if (!postId) return <h1>Loading...</h1>;

  console.log(postId);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>
        <Grid item>
          <Card>
            <CardHeader
              avatar={<Avatar aria-label="User">D</Avatar>}
              title="Author"
              subheader={postId.date}
            />
            <CardMedia
              component="img"
              alt="Featured Art No.1"
              height="140"
              image={postId.art}
              title="Featured Art No.1"
            />
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {postId.title}
                </Typography>
                <br />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();
  const result = await Post.findById(context.params.id).lean();
  result._id = result._id.toString();
  return { props: { post: result } };
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
