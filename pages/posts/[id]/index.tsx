import { Container, Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import styles from "../../styles/Specific/Post.module.css";
import Head from "next/head";
import { InitializePostInfo } from "../../../utils/fetchData";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
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
import {
  POST_ID_QUERY,
  POST_RECOMMENDED_QUERY,
} from "../../../apollo/Queries/postQueries";
import { AppContext } from "../../../Components/Appbar/AppWrap";

const DynamicImageDialog = dynamic(
  () => import("../../../Components/PostInfo/PostDialogs/ImageDialog")
);
const DynamicDeleteDialog = dynamic(
  () => import("../../../Components/PostInfo/PostDialogs/DeleteDialog")
);

type Props = {
  id: string;
  alreadyLiked: boolean;
};

const PostID = ({ id, alreadyLiked }: Props) => {
  const drawerOpen = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
      limit: 20,
    },
  });

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const handleDeleteDialog = () => {
    setDeleteOpen(!deleteOpen);
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{postId.title}</title>
      </Head>
      <Grid container className={styles.grid}>
        {postId && recommendedPosts && (
          <>
            <Grid
              item
              xs={12}
              md={12}
              lg={drawerOpen ? 12 : 8}
              className={styles.postInfo}
            >
              <Container sx={{ display: "flex", flexDirection: "column" }}>
                <PostInfo
                  postID={postId}
                  alreadyLiked={alreadyLiked}
                  handleOpenDialog={handleOpenDialog}
                  handleDeleteDialog={handleDeleteDialog}
                  fetchComments={MoreComm}
                />
              </Container>
            </Grid>
            <Grid item xs={12} md={12} lg={drawerOpen ? 12 : 4}>
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
      <DynamicDeleteDialog
        handleClose={handleDeleteDialog}
        open={deleteOpen}
        postId={id}
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
    },
  });
};

export default PostID;
