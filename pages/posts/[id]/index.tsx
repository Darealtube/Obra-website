import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import styles from "../../styles/Specific/Post.module.css";
import Head from "next/head";
import { InitializePostInfo } from "../../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import {
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
  VIEW_POST,
} from "../../../apollo/apolloQueries";
import { useMutation, useQuery } from "@apollo/client";
import PostInfo from "../../../Components/PostInfo/PostInfo";
import RecommendedList from "../../../Components/PostInfo/RecommendedList";
import dynamic from "next/dynamic";
import {
  PostData,
  PostVars,
  RecommendedPostData,
} from "../../../interfaces/QueryInterfaces";
import {
  ViewPostData,
  ViewPostVars,
} from "../../../interfaces/MutationInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";

const DynamicImageDialog = dynamic(
  () => import("../../../Components/PostInfo/ImageDialog")
);

type Props = {
  id: string;
  alreadyLiked: boolean;
};

const PostID = ({ id, alreadyLiked }: Props) => {
  const [session, loading] = useSession();
  const [viewed] = useMutation<ViewPostData, ViewPostVars>(VIEW_POST);
  const [open, setOpen] = useState(false);
  const {
    data: { postId },
    fetchMore: MoreComm,
  } = useQuery<PostData, PostVars>(POST_ID_QUERY, {
    variables: {
      id: id,
      limit: 4,
    },
  });
  const {
    data: { recommendedPosts },
    fetchMore: MoreRecc,
  } = useQuery<RecommendedPostData, PostVars>(POST_RECOMMENDED_QUERY, {
    variables: {
      id: id,
      limit: 4,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  // This useEffect adds the post to the view history of the user upon rendering the page.
  useEffect(() => {
    if (session && !loading) {
      viewed({
        variables: {
          userId: session?.id,
          viewed: id,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, loading]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{postId.title}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        {postId && recommendedPosts && (
          <>
            <PostInfo
              postID={postId}
              setOpen={setOpen}
              fetchMore={MoreComm}
              alreadyLiked={alreadyLiked}
            />
            <RecommendedList
              fetchMore={MoreRecc}
              recommended={recommendedPosts}
            />
          </>
        )}
      </Grid>

      <DynamicImageDialog
        handleClose={handleClose}
        open={open}
        art={postId.watermarkArt}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, exists, alreadyLiked } = await InitializePostInfo(
    context.params.id as string,
    session ? session.id : null
  );

  if (exists === false) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session: session,
      id: context.params.id,
      alreadyLiked: alreadyLiked,
    },
  });
};

export default PostID;
