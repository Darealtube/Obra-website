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

const NotAllowedDialog = ({ open }) => {
  
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `https://obra-website.vercel.app/home`,
    });
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>Sign in to Obra before creating a Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to Sign In to Obra in order to create a post.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: "flex" }}>
          <Link href={"/home"} passHref>
            <Button component="a">
              Return Home
            </Button>
          </Link>
          <Button onClick={handleSignIn}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotAllowedDialog;
