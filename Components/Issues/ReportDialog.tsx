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
import { useRouter } from "next/router";
import { useState } from "react";
import { WARN_MUTATION } from "../../apollo/Mutations/reportMutation";
import { WarnVars } from "../../interfaces/MutationInterfaces";

interface ReportProps {
  id: string;
  email: string;
  reason: string;
}

type Props = {
  open: boolean;
  handleClose: () => void;
  report: ReportProps;
  push?: boolean;
};

const ReportDialog = ({ open, handleClose, report, push }: Props) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [warn] = useMutation<boolean, WarnVars>(WARN_MUTATION);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    warn({
      variables: {
        reportId: report.id,
        reportedEmail: report.email,
        title: "Obra Warning",
        description: description,
        reason: report.reason,
      },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Report:${report.id}` });
        cache.gc();
      },
    });
    handleClose();
    if (push) router.push("/issues/post/");
  };

  return (
    <>
      <Dialog open={open} disableEscapeKeyDown>
        <DialogTitle>Are you sure?</DialogTitle>
        <form onSubmit={handleReport}>
          <DialogContent>
            <DialogContentText>
              Leave a message warning the user about the report.
            </DialogContentText>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="message"
              label="Message"
              placeholder="Leave a message on how you should be contacted about the
            price, and how you will transfer the art."
              name="message"
              color="primary"
              inputProps={{ maxLength: 100, minLength: 20 }}
              rows={3}
              multiline={true}
              maxRows={4}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Send Warning
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ReportDialog;
