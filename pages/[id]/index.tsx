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
import { fetchAPost, fetchPosts, fetchUser } from "../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { UserInterface } from "../../interfaces/UserInterface";
import { LIKE_MUTATION, UNLIKE_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";

const PostID = ({
  postID,
  posts,
  user,
}: {
  postID: PostInterface;
  posts: PostInterface[];
  user: UserInterface;
}) => {
  const [open, setOpen] = useState(false);
  let userLikedPosts = user.likedPosts.map((post) => post.id);
  const [liked, setLiked] = useState(userLikedPosts.includes(postID.id));
  const [like] = useMutation(LIKE_MUTATION);
  const [unlike] = useMutation(UNLIKE_MUTATION);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!liked) {
      like({ variables: { postId: postID.id, userName: user.name } });
    } else {
      unlike({ variables: { postId: postID.id, userName: user.name } });
    }
    setLiked(!liked);
  };

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
                    <Button
                      onClick={handleLike}
                      style={liked ? { color: "red" } : { color: "inherit" }}
                    >
                      LIKE
                    </Button>
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
  const session = await getSession(context);
  const postID: PostInterface = await fetchAPost(context.params.id as string);
  const posts: PostInterface[] = await fetchPosts();
  const user: UserInterface = await fetchUser(session.user.name);
  if (!postID) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postID,
      posts,
      user,
    },
  };
};

export default PostID;
