import { GetStaticProps } from "next";
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
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
  const result = await Post.findById({ _id: context.params });
  result._id = result._id.toString();
  return { props: { post: result } };
};

export default PostID;
