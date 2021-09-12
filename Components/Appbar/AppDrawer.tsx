import { signIn, useSession } from "next-auth/client";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  ListItemSecondaryAction,
  Button,
  Skeleton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerItems from "../ListItems/Drawer";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SkeletonDrawer from "../ListItems/SkeletonDrawer";

const drawerWidth = "24vw";

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

const AppDrawer = ({ user, moreNotif, handleDrawer, drawerOpen }) => {
  const [session, loading] = useSession();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
    >
      <List>
        {session && !loading && user ? (
          <>
            <ListItem>
              <ListItemIcon>
                <Image
                  src={
                    user.userId.image
                      ? user.userId.image
                      : "/user-empty-avatar.png"
                  }
                  width={40}
                  height={40}
                  className={styles.avatar}
                  alt={"User Image"}
                />
              </ListItemIcon>
              <ListItemText
                primary={user?.userId.name}
                sx={{ wordBreak: "break-all" }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={handleDrawer}>
                  <MenuIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <DrawerItems user={user} moreNotif={moreNotif} />
          </>
        ) : !session && !loading ? (
          <>
            <ListItem component={Button} onClick={handleSignIn}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Sign In</ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={handleDrawer}>
                  <MenuIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <DrawerItems user={user} moreNotif={moreNotif} />
          </>
        ) : (
          <>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Skeleton variant="rectangular" />
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton onClick={handleDrawer}>
                  <MenuIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <SkeletonDrawer />
          </>
        )}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
