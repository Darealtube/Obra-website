import { useMutation } from "@apollo/client";
import {
  Grid,
  Typography,
  Chip,
  Button,
  Container,
  CircularProgress,
  Divider,
  TextField,
  InputAdornment,
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
import { CommentInterface } from "../../interfaces/CommentInterface";
import { PostInterface } from "../../interfaces/PostInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Post.module.css";
import CommentList from "../CommentList";
import SendIcon from "@material-ui/icons/Send";

type Parameters = {
  postID: PostInterface;
  setOpen: Dispatch<SetStateAction<boolean>>;
  liked: boolean;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  comments: CommentInterface[];
  page: number;
  More: () => void;
  hasMore: boolean;
  session: Session;
  user: UserInterface;
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
  user,
}: Parameters) => {
  const [addComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update: (cache, mutationResult) => {
      const newComment = mutationResult.data.createComment;
      const data = cache.readQuery({
        query: POST_ID_QUERY,
        variables: { id: postID.id },
      });
      cache.writeQuery({
        query: POST_ID_QUERY,
        variables: { id: postID.id },
        data: {
          postId: {
            ...data.postId,
            comments: [newComment, ...data.postId.comments],
          },
        },
      });
    },
  });
  const [comment, setComment] = useState({
    postID: postID.id,
    content: "",
    author: user.name,
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
                <Typography variant="subtitle1">
                  {postID.author.name}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="h6">
                  {postID.sale === "No" ? "Showcase only" : "₱" + postID.price}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                {postID.tags?.map((tag) => {
                  <Chip label={tag} className={styles.tag}></Chip>;
                })}
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" style={{ wordWrap: "break-word" }}>
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

        <br />
        <br />
        <Typography variant="overline">Comments</Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            value={comment.content}
            id="content"
            label="Comment"
            name="content"
            multiline={true}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <InfiniteScroll
          dataLength={page * 4}
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
        >
          <CommentList comments={comments} id={session.id} />
        </InfiniteScroll>
      </Container>
    </Grid>
  );
};

export default PostInfo;
