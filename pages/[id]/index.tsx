import Appbar from "../../Components/Appbar/Appbar";
import {
  CssBaseline,
  Grid,
  Container,
  Dialog,
  Paper,
  IconButton,
  Fab,
} from "@material-ui/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Specific/Post.module.css";
import Head from "next/head";
import { InitializePostInfo } from "../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import {
  LIKE_MUTATION,
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
  UNLIKE_MUTATION,
  VIEW_POST,
} from "../../apollo/apolloQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import usePagination from "../../Hooks/usePagination";
import PostInfo from "../../Components/PostInfo/PostInfo";
import RecommendedList from "../../Components/PostInfo/RecommendedList";
import { edges } from "../../interfaces/CommentInterface";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

const PostID = ({ id, alreadyLiked }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [like] = useMutation(LIKE_MUTATION);
  const [unlike] = useMutation(UNLIKE_MUTATION);
  const {
    data: { postId },
    fetchMore: MoreComm,
  } = useQuery(POST_ID_QUERY, {
    variables: {
      id: id,
    },
  });
  const {
    data: { recommendedPosts },
    fetchMore,
  } = useQuery(POST_RECOMMENDED_QUERY, {
    variables: {
      id: id,
    },
  });
  const [viewed] = useMutation(VIEW_POST);
  const { More: MoreComments, hasMore: hasMoreComments } = usePagination(
    "postId",
    MoreComm,
    postId.comments,
    "comments"
  );
  const [liked, setLiked] = useState(alreadyLiked);
  const { More, hasMore } = usePagination(
    "recommendedPosts",
    fetchMore,
    recommendedPosts
  );

  useEffect(() => {
    viewed({
      variables: {
        userId: session.id,
        viewed: id,
      },
    });
  }, []);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session && !loading) {
      router.replace("/api/auth/signin");
    }
    if (!liked) {
      like({
        variables: { postId: postId.id, userID: session.id },
      });
      setLiked(true);
    } else {
      unlike({
        variables: { postId: postId.id, userID: session.id },
      });
      setLiked(false);
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{postId.title}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <PostInfo
          postID={postId}
          setOpen={setOpen}
          liked={liked as boolean}
          handleLike={handleLike}
          page={postId.comments.edges.length}
          hasMore={hasMoreComments}
          More={MoreComments}
          comments={postId.comments.edges as edges[]}
          session={session}
          userID={session.id}
        />
        <RecommendedList
          hasMore={hasMore}
          page={recommendedPosts.edges.length}
          More={More}
          session={session}
          recommendedPosts={recommendedPosts.edges}
        />
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={styles.dialog}
        fullWidth
        maxWidth={"xl"}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Container className={styles.container}>
          <IconButton
            onClick={() => setOpen(false)}
            className={styles.exit}
            edge="start"
            size="medium"
            color="inherit"
          >
            <FullscreenExitIcon style={{ color: "white" }} />
          </IconButton>
          <Image src={postId.art} layout="fill" objectFit="contain" />
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
      session: session,
      id: context.params.id,
      alreadyLiked: data.alreadyLiked,
    },
  };
};

export default PostID;
