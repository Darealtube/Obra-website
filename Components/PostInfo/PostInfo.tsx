import { useMutation } from "@apollo/client";
import {
  Grid,
  Typography,
  Chip,
  Button,
  Container,
  CircularProgress,
  Divider,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@material-ui/core";
import { Session } from "next-auth/client";
import Image from "next/image";
import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  CREATE_COMMENT_MUTATION,
  POST_ID_QUERY,
} from "../../apollo/apolloQueries";
import { edges } from "../../interfaces/CommentInterface";
import { PostInterface } from "../../interfaces/PostInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Post.module.css";
import CommentList from "../CommentList";
import CommentForm from "../Forms/CreateComment";
import CommentDrawer from "./CommentDrawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Parameters = {
  postID: PostInterface;
  setOpen: Dispatch<SetStateAction<boolean>>;
  liked: boolean;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  comments: edges[];
  page: number;
  More: () => void;
  hasMore: boolean;
  session: Session;
  userID: string;
};

const PostInfo = ({
  postID,
  setOpen,
  handleLike,
  liked,
  comments,
  page,
  hasMore,
  More,
  session,
  userID,
}: Parameters) => {
  const commentToggle = useMediaQuery("(max-width:768px)");
  const [openComment, setOpenComment] = useState(false);
  const handleDrawer = () => {
    setOpenComment(!openComment);
  };

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
    author: userID,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({
      ...comment,
      content: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment({
      variables: {
        author: comment.author,
        content: comment.content,
        postID: comment.postID,
      },
    });
    setComment({
      ...comment,
      content: "",
    });
  };

  return (
    <Grid item xs={12} md={8} className={styles.postInfo}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} className={styles.artContainer}>
            {postID.art && (
              <Image
                src={postID.art}
                layout="fill"
                objectFit="contain"
                onClick={() => setOpen(true)}
              />
            )}
          </Grid>
          <Grid item xs={6} className={styles.information}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" style={{ wordWrap: "break-word" }}>
                  {postID.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {postID.author.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {postID.sale === "No" ? "Showcase only" : "₱" + postID.price}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {postID.tags?.map((tag) => {
                  <Chip label={tag} className={styles.tag}></Chip>;
                })}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" style={{ wordWrap: "break-word" }}>
                  {postID.description}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleLike}
                  style={
                    liked === true ? { color: "red" } : { color: "inherit" }
                  }
                >
                  LIKE
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button>ADD</Button>
              </Grid>
              <Grid item xs={4}>
                <Button>SHARE</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
              comment={comment}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <InfiniteScroll
              dataLength={page}
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
              <CommentList comments={comments} id={session.id} />
            </InfiniteScroll>
          </>
        )}
      </Container>

      {/* COMMENT DRAWER IS REALLY BUGGY AT THE MOMENT BECAUSE OF THE REACT-INFINITE-SCROLL BUG WHERE
          IF THE CONTAINER ISN'T SCROLLABLE, THE "NEXT" FUNCTION DOES NOT EXECUTE. */}
      <CommentDrawer
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        page={page}
        More={More}
        hasMore={hasMore}
        comments={comments}
        session={session}
        open={openComment}
        handleDrawer={handleDrawer}
      />
    </Grid>
  );
};

export default PostInfo;
