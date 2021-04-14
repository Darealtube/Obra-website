import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const CommentForm = ({ comment, setComment, addComment }) => {
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
  );
};

export default CommentForm;
