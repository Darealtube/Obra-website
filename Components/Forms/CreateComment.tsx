import { DataProxy, useMutation } from "@apollo/client";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { CREATE_COMMENT_MUTATION } from "../../apollo/apolloQueries";
import { AddCommentData } from "../../interfaces/MutationInterfaces";
import { commentUpdate } from "../../utils/update";

type Comment = {
  id: string;
};

const CommentForm = ({ id }: Comment) => {
  const [session] = useSession();
  const [addComment] = useMutation<AddCommentData>(CREATE_COMMENT_MUTATION, {
    update: (cache: DataProxy, mutationResult) =>
      commentUpdate(cache, mutationResult, id),
  });
  const [disabled, setDisabled] = useState(false);
  const [comment, setComment] = useState({
    postID: id,
    content: "",
    author: session?.id as string,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({
      ...comment,
      content: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
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
    setDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="none"
        fullWidth
        value={comment.content}
        id="content"
        label={session ? "Comment" : "Sign In to comment on posts."}
        name="content"
        multiline={true}
        onChange={handleChange}
        disabled={!session || disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" disabled={disabled || !session}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default CommentForm;
