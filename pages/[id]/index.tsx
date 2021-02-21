import Appbar from "../../Components/Appbar/Appbar";
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
import { useState, useEffect } from "react";
import styles from "../styles/Specific/Post.module.css";
import { CardList } from "../../Components/CardList";
import { PostInterface } from "../../interfaces/PostInterface";
import Head from "next/head";
import { InitializePostInfo } from "../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { UserInterface } from "../../interfaces/UserInterface";
import {
  LIKE_MUTATION,
  POST_ID_QUERY,
  POST_QUERY,
  UNLIKE_MUTATION,
  USER_ID_QUERY,
} from "../../apollo/apolloQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const PostID = ({ id, alreadyLiked }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [like] = useMutation(LIKE_MUTATION);
  const [unlike] = useMutation(UNLIKE_MUTATION);
  const { data: user } = useQuery(USER_ID_QUERY, {
    variables: {
      id: session?.id,
    },
    skip: !session,
  });
  const { data: posts } = useQuery(POST_QUERY);
  const { data: postID } = useQuery(POST_ID_QUERY, {
    variables: {
      id: id,
    },
  });

  const [liked, setLiked] = useState(alreadyLiked);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session && !loading) {
      router.replace("/api/auth/signin");
    }
    if (!liked) {
      like({
        variables: { postId: postID.postId.id, userName: user?.userId.name },
      });
      setLiked(true);
    } else {
      unlike({
        variables: { postId: postID.postId.id, userName: user?.userId.name },
      });
      setLiked(false);
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{postID.postId.title}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <Grid item lg={8} className={styles.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} className={styles.artContainer}>
                {postID.postId.art && (
                  <Image
                    src={postID.postId.art}
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
                      {postID.postId.title}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="subtitle1">
                      {postID.postId.author.name}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">
                      {postID.postId.sale === "No"
                        ? "Showcase only"
                        : "₱" + postID.postId.price}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    {postID.postId.tags?.map((tag) => {
                      <Chip label={tag} className={styles.tag}></Chip>;
                    })}
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="body1"
                      style={{ wordWrap: "break-word" }}
                    >
                      {postID.postId.description}
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
              <CardList postData={posts.posts} id={session?.id} />
            </Container>
            {/* Recommended List */}
          </Container>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Container className={styles.dialog}>
          <Image src={postID.postId.art} layout="fill" objectFit="contain" />
        </Container>
      </Dialog>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const data = await InitializePostInfo(
    context.params.id as string,
    session.id
  );

  if (data.exists === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: data.data,
      id: context.params.id,
      alreadyLiked: data.alreadyLiked,
    },
  };
};

export default PostID;
