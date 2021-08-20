import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import router from "next/router";
import { DELETE_POST_MUTATION } from "../../../apollo/apolloQueries";

const DeleteDialog = ({ open, handleClose, postId }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const handleDelete = () => {
    deletePost({
      variables: { postId },
    });
    router.push("/");
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography align="center" variant="h4">Delete This Post?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography paragraph>
              Deleting this post means that you will never be able to see nor
              recover this post again, and after some time the categories that
              this post used to be in will not display this art anymore. If this
              is sale, then this art will also be removed from the people who
              added this art to their cart. Are you sure that you want to delete
              this post?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography>Disagree</Typography>
          </Button>
          <Button onClick={handleDelete}>
            <Typography>Agree</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
