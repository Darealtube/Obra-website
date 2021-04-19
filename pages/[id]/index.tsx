import Appbar from "../../Components/Appbar/Appbar";
import { CssBaseline, Grid } from "@material-ui/core";
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
import PostInfo from "../../Components/PostInfo/PostInfo";
import RecommendedList from "../../Components/PostInfo/RecommendedList";
import dynamic from "next/dynamic";
import {
  PostData,
  PostVars,
  RecommendedPostData,
} from "../../interfaces/QueryInterfaces";
import {
  LikeData,
  UnlikeLikeVars,
  UnlikeData,
  ViewPostData,
  ViewPostVars,
} from "../../interfaces/MutationInterfaces";

const DynamicImageDialog = dynamic(
  () => import("../../Components/PostInfo/ImageDialog")
);

type Props = {
  id: string;
  alreadyLiked: boolean;
};

const PostID = ({ id, alreadyLiked }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [like] = useMutation<LikeData, UnlikeLikeVars>(LIKE_MUTATION);
  const [unlike] = useMutation<UnlikeData, UnlikeLikeVars>(UNLIKE_MUTATION);
  const {
    data: { postId },
    fetchMore: MoreComm,
  } = useQuery<PostData, PostVars>(POST_ID_QUERY, {
    variables: {
      id: id,
    },
  });
  const {
    data: { recommendedPosts },
    fetchMore: MoreRecc,
  } = useQuery<RecommendedPostData, PostVars>(POST_RECOMMENDED_QUERY, {
    variables: {
      id: id,
    },
  });
  const [viewed] = useMutation<ViewPostData, ViewPostVars>(VIEW_POST);
  const [liked, setLiked] = useState(alreadyLiked);

  const handleClose = () => {
    setOpen(false);
  };

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
          session={session}
          fetchMore={MoreComm}
        />
        <RecommendedList
          fetchMore={MoreRecc}
          session={session}
          recommended={recommendedPosts}
        />
      </Grid>

      <DynamicImageDialog
        handleClose={handleClose}
        open={open}
        postId={postId}
      />
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
