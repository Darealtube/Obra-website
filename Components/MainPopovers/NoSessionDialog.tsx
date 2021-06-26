import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { signIn } from "next-auth/client";
import Link from "next/link";

const NotAllowedDialog = ({ open }: { open: boolean }) => {
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `https://obra-website.vercel.app/home`,
    });
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>
          Sign in to Obra before seeing this content or doing this action.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to Sign In to Obra in order to experience the full extent
            of what Obra has to offer. You are still able to see general content
            like posts, and you are still able to do other actions like
            reporting posts and/or bug reports, but we need you to Sign In first
            to do this action / see this content.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: "flex" }}>
          <Link href={"/home"} passHref>
            <Button component="a">Return Home</Button>
          </Link>
          <Button onClick={handleSignIn}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotAllowedDialog;
