import { Button, Typography } from "@material-ui/core";
import { signIn } from "next-auth/client";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  /*
    This link for signIn or signOut should be changed from http://localhost:3000/
    when in development mode, to https://obra-website.vercel.app/ when deploying to
    vercel (production).
  */
  signIn("google", {
    callbackUrl: `https://obra-website.vercel.app/`,
  });
};

const AppbarNoUser = () => {
  return (
    <div>
      <Button startIcon={<AccountCircleOutlinedIcon />} onClick={handleSignIn} variant="contained" color="success">
        <Typography>Sign In</Typography>
      </Button>
    </div>
  );
};

export default AppbarNoUser;
