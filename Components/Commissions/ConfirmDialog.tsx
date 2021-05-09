import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogContentText,
} from "@material-ui/core";
import { useState } from "react";
import { DELETE_COMMISSION_MUTATION } from "../../apollo/apolloQueries";

type Props = {
  open: boolean;
  id: string;
  handleClose: () => void;
};

const ConfirmDialog = ({ open, id, handleClose }: Props) => {
  const [reject] = useMutation(DELETE_COMMISSION_MUTATION);
  const [reason, setReason] = useState("");
  const handleReject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reject({
      variables: {
        commissionId: id,
        reason: reason,
      },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Commission:${id}` });
        cache.gc();
      },
    });
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>Are you sure?</DialogTitle>
        <form onSubmit={handleReject}>
          <DialogContent>
            <DialogContentText>
              Please tell us a reason why you want to reject this commission.
            </DialogContentText>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="reason"
              label="Reason"
              name="reason"
              color="primary"
              rows={3}
              multiline={true}
              rowsMax={4}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Reject Commission
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
