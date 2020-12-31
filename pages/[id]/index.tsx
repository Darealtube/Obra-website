import { GetStaticProps, GetStaticPaths } from "next";
import dbConnect from "../utils/dbConnect";
import Post from "../model/Post";
import Appbar from "../Components/Appbar";
import {
  Theme,
  makeStyles,
  CssBaseline,
  createStyles,
  Grid,
  Card,
} from "@material-ui/core";

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

const PostID = ({ post }) => {
  const classes = useStyles();
  console.log(post);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>
        <Grid item>
          <Card>
            <h1>{post.title}</h1>
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
