import { GetStaticProps, GetStaticPaths, GetStaticPropsResult } from "next";
import dbConnect from "../utils/dbConnect";
import Post from "../model/Post";
import Appbar from "../Components/Appbar";
import useSWR from "swr";
import {
  CssBaseline,
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
import styles from "../styles/Specific/Post.module.css";
import { CardList } from "../Components/CardList";
import { PostInterface } from "../interfaces/PostInterface";

interface RecommendedData {
  recommendedPosts: PostInterface[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostID = ({ recommendedPosts }: RecommendedData) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const url = `http://localhost:3000/api/Posts/${router.query.id}`;
  const { data: postId, error } = useSWR(url, fetcher);
  if (error) return <h1>Something went wrong!</h1>;
  if (!postId) return <SkeletonPost />;

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <Grid item lg={8} className={styles.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} className={styles.artContainer}>
                {postId.art && (
                  <Image
                    src={postId.art}
                    layout="fill"
                    objectFit="contain"
                    onClick={() => setOpen(true)}
                  />
                )}
              </Grid>
              <Grid item lg={6} className={styles.information}>
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
                      <Chip label={tag} className={styles.tag}></Chip>;
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
          </Container>
        </Grid>
        <Grid item lg={4} className={styles.recommended}>
          <Container>
            <Typography variant="h4">Recommended List</Typography>
            <Divider />
            {/* Recommended List */}
            <Container className={styles.recommendedList}>
              <CardList postData={recommendedPosts} />
            </Container>
            {/* Recommended List */}
          </Container>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Container className={styles.dialog}>
          <Image src={postId.art} layout="fill" objectFit="contain" />
        </Container>
      </Dialog>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<RecommendedData>> => {
  await dbConnect();
  const result = await Post.findById(context.params.id).lean();
  const recommended = await Post.find({});
  const recommendedPosts = recommended.map((data) => {
    const post = data.toObject();
    post._id = post._id.toString();
    return post;
  });
  result._id = result._id.toString();
  return { props: { recommendedPosts } };
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
