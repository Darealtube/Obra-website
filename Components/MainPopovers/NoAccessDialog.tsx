import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Link from "next/link";

const NotAllowedDialog = ({ open }: { open: boolean }) => {
  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>
          You are not allowed to make changes or do something here.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You get this message when you try to either commission yourself,
            report yourself, or edit another user&apos;s content or information.
            You are not allowed to access this content because you&apos;re
            either unauthorized or doesn&apos;t make sense to access this
            content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link href={"/home"} passHref>
            <Button component="a">Return Home</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotAllowedDialog;
