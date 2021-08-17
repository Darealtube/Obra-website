import Appbar from "../../../Components/Appbar/Appbar";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import { useState } from "react";
import styles from "../../styles/Specific/Post.module.css";
import Head from "next/head";
import { InitializePostInfo } from "../../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import {
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
} from "../../../apollo/apolloQueries";
import { useQuery } from "@apollo/client";
import PostInfo from "../../../Components/PostInfo/PostInfo";
import RecommendedList from "../../../Components/PostInfo/RecommendedList";
import dynamic from "next/dynamic";
import {
  PostData,
  QueryIdVars,
  RecommendedPostData,
} from "../../../interfaces/QueryInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";
import Comments from "../../../Components/PostInfo/Comments";

const DynamicImageDialog = dynamic(
  () => import("../../../Components/PostInfo/ImageDialog")
);

type Props = {
  id: string;
  alreadyLiked: boolean;
  alreadyAdded: boolean;
};

const PostID = ({ id, alreadyLiked, alreadyAdded }: Props) => {
  const [open, setOpen] = useState(false);
  const {
    data: { postId },
    fetchMore: MoreComm,
  } = useQuery<PostData, QueryIdVars>(POST_ID_QUERY, {
    variables: {
      id: id,
      limit: 4,
    },
  });
  const {
    data: { recommendedPosts },
    fetchMore: MoreRecc,
  } = useQuery<RecommendedPostData, QueryIdVars>(POST_RECOMMENDED_QUERY, {
    variables: {
      id: id,
      limit: 12,
    },
  });

  const handleOpenDialog = () => {
    setOpen(!open);
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
        {postId && recommendedPosts && (
          <>
            <Grid item xs={12} md={6} lg={8} className={styles.postInfo}>
              <Container sx={{ display: "flex", flexDirection: "column" }}>
                <PostInfo
                  postID={postId}
                  alreadyAdded={alreadyAdded}
                  alreadyLiked={alreadyLiked}
                  handleOpenDialog={handleOpenDialog}
                />
                <Comments postID={postId} fetchMore={MoreComm} />
              </Container>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className={styles.recommended}>
              <RecommendedList
                fetchMore={MoreRecc}
                recommended={recommendedPosts}
              />
            </Grid>
          </>
        )}
      </Grid>

      <DynamicImageDialog
        handleClose={handleOpenDialog}
        open={open}
        art={postId.watermarkArt}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, exists, alreadyLiked, alreadyAdded } = await InitializePostInfo(
    context.params.id as string,
    session ? session.id : null
  );

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session: session,
      id: context.params.id,
      alreadyLiked: alreadyLiked,
      alreadyAdded: alreadyAdded,
    },
  });
};

export default PostID;
