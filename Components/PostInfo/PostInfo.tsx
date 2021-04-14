import { useMutation } from "@apollo/client";
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
import CommentDrawer from "./CommentDrawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import usePagination from "../../Hooks/usePagination";
import Main from "./Main";
import { Session } from "next-auth/client";

type Parameters = {
  postID: PostInterface;
  setOpen: Dispatch<SetStateAction<boolean>>;
  liked: boolean;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fetchMore: any;
  session: Session;
};

const PostInfo = ({
  postID,
  setOpen,
  handleLike,
  liked,
  fetchMore,
  session,
}: Parameters) => {
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

  const [addComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update: (cache, mutationResult) => {
      const newComment = mutationResult.data.createComment;
      const { postId } = cache.readQuery({
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
    author: session.id,
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
              <CommentList comments={postID.comments.edges} id={session.id} />
            </InfiniteScroll>
          </>
        )}
      </Container>

      <CommentDrawer
        setComment={setComment}
        addComment={addComment}
        comment={comment}
        page={postID.comments.edges.length}
        More={More}
        hasMore={hasMore}
        comments={postID.comments.edges}
        session={session}
        open={openComment}
        handleDrawer={handleDrawer}
        parentRef={ref}
      />
    </Grid>
  );
};

export default PostInfo;
