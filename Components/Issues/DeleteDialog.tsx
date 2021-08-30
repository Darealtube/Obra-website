import { useMutation } from "@apollo/client";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { DELETE_REPORT_MUTATION } from "../../apollo/Mutations/reportMutation";

type Props = {
  open: boolean;
  handleClose: () => void;
  targetId: string;
  push?: boolean;
};

const DeleteDialog = ({ open, handleClose, targetId, push }: Props) => {
  const [deleteReport] = useMutation(DELETE_REPORT_MUTATION);
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteReport({
      variables: {
        reportId: targetId,
      },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Report:${targetId}` });
        cache.gc();
      },
    });
    handleClose();
    if (push) router.push("/issues/post/");
  };

  return <>
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  </>;
};

export default DeleteDialog;
