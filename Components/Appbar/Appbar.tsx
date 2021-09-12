import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AppbarMenu from "./AppbarMenu";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import Image from "next/image";
import DrawerItems from "../ListItems/Drawer";
import { signIn, useSession } from "next-auth/client";
import { AppbarUserData } from "../../interfaces/QueryInterfaces";
import { useState } from "react";

type AppBarProps = {
  user: AppbarUserData;
  moreNotif: any;
};

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

const Appbar = ({ user, moreNotif }: AppBarProps) => {
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={styles.menuButton}
            onClick={handleDrawer}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/obra-logo.png"
            height={40}
            width={40}
            alt={"Obra Logo"}
          />
          <Typography
            variant="h6"
            noWrap
            className={styles.toolbarTitle}
            style={{ marginLeft: "8px" }}
          >
            Obra
          </Typography>
          {/* Drawer and Logo */}
          {session && !loading && user ? (
            <AppbarMenu user={user} />
          ) : !session && !loading ? (
            <Button
              startIcon={<AccountCircleOutlinedIcon />}
              onClick={handleSignIn}
              variant="contained"
              color="success"
            >
              <Typography>Sign In</Typography>
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={handleDrawer}
        onOpen={handleDrawer}
      >
        <List className={styles.list}>
          <DrawerItems user={user} moreNotif={moreNotif} />
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Appbar;
