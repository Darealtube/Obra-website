import Appbar from "../../Components/Appbar";
import {
  CssBaseline,
  Grid,
  Typography,
  Chip,
  Button,
  Container,
  Divider,
  Dialog,
} from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Specific/Post.module.css";
import { CardList } from "../../Components/CardList";
import { PostInterface } from "../../interfaces/PostInterface";
import Head from "next/head";
import { fetchAPost, fetchPosts } from "../../utils/fetchData";
import { GetServerSideProps } from "next";

const PostID = ({
  postID,
  posts,
}: {
  postID: PostInterface;
  posts: PostInterface[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{postID.title}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <Grid item lg={8} className={styles.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} className={styles.artContainer}>
                {postID.art && (
                  <Image
                    src={postID.art}
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
                      {postID.title}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="subtitle1">{postID.author}</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">
                      {postID.sale === "No"
                        ? "Showcase only"
                        : "₱" + postID.price}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    {postID.tags?.map((tag) => {
                      <Chip label={tag} className={styles.tag}></Chip>;
                    })}
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="body1"
                      style={{ wordWrap: "break-word" }}
                    >
                      {postID.description}
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
              <CardList postData={posts} />
            </Container>
            {/* Recommended List */}
          </Container>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Container className={styles.dialog}>
          <Image src={postID.art} layout="fill" objectFit="contain" />
        </Container>
      </Dialog>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postID: PostInterface = await fetchAPost(context.params.id as string);
  const posts: PostInterface[] = await fetchPosts();

  if (!postID) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postID,
      posts,
    },
  };
};

export default PostID;
