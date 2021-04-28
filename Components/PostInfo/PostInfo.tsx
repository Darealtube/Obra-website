import { DataProxy, useMutation } from "@apollo/client";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Divider,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  CREATE_COMMENT_MUTATION,
  POST_ID_QUERY,
} from "../../apollo/apolloQueries";
import { PostInterface } from "../../interfaces/PostInterface";
import styles from "../../pages/styles/Specific/Post.module.css";
import CommentList from "../CommentList";
import CommentForm from "../Forms/CreateComment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import usePagination from "../../Hooks/usePagination";
import Main from "./Main";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { AddCommentData } from "../../interfaces/MutationInterfaces";
import { PostData, PostVars } from "../../interfaces/QueryInterfaces";

const DynamicCommentDrawer = dynamic(() => import("./CommentDrawer"));

type Parameters = {
  postID: PostInterface;
  setOpen: Dispatch<SetStateAction<boolean>>;
  liked: boolean;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fetchMore: any;
};

const PostInfo = ({
  postID,
  setOpen,
  handleLike,
  liked,
  fetchMore,
}: Parameters) => {
  const [session] = useSession();
  const commentToggle = useMediaQuery("(max-width:768px)");
  const [openComment, setOpenComment] = useState(false);
  const handleDrawer = () => {
    setOpenComment(!openComment);
  };
  const { More, hasMore, ref } = usePagination(
    "postId",
    fetchMore,
    postID.comments,
    "comments",
    openComment
  );

  const [addComment] = useMutation<AddCommentData>(CREATE_COMMENT_MUTATION, {
    update: (cache: DataProxy, mutationResult) => {
      const newComment = mutationResult.data.createComment;
      const { postId } = cache.readQuery<PostData, PostVars>({
        query: POST_ID_QUERY,
        variables: { id: postID.id },
      });

      cache.writeQuery({
        query: POST_ID_QUERY,
        variables: { id: postID.id },
        data: {
          postId: {
            ...postId,
            comments: {
              ...postId.comments,
              edges: [
                { __typeName: "CommentEdge", node: newComment },
                ...postId.comments.edges,
              ],
            },
          },
        },
      });
    },
  });
  const [comment, setComment] = useState({
    postID: postID.id,
    content: "",
    author: session?.id as string,
  });

  return (
    <Grid item xs={12} md={8} className={styles.postInfo}>
      <Container>
        <Main
          postID={postID}
          handleLike={handleLike}
          liked={liked}
          setOpen={setOpen}
        />
        <br />
        <br />
        <Typography variant="overline">Comments</Typography>
        <Divider />
        {commentToggle ? (
          <IconButton onClick={handleDrawer} style={{ width: "inherit" }}>
            <ExpandMoreIcon />
          </IconButton>
        ) : (
          <>
            <CommentForm
              setComment={setComment}
              addComment={addComment}
              comment={comment}
            />
            <InfiniteScroll
              dataLength={postID.comments.edges.length}
              next={More}
              hasMore={hasMore}
              loader={
                <>
                  <br />
                  <CircularProgress />
                </>
              }
              style={{
                overflow: "hidden",
              }}
              scrollThreshold={0.5}
            >
              <CommentList comments={postID.comments.edges} />
            </InfiniteScroll>
          </>
        )}
      </Container>

      <DynamicCommentDrawer
        setComment={setComment}
        addComment={addComment}
        comment={comment}
        More={More}
        hasMore={hasMore}
        comments={postID.comments.edges}
        open={openComment}
        handleDrawer={handleDrawer}
        parentRef={ref}
      />
    </Grid>
  );
};

export default PostInfo;
