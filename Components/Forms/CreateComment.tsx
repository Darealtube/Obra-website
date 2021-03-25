import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const CommentForm = ({ handleSubmit, comment, handleChange }) => {
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
