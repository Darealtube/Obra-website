import {
  styled,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  Divider,
  useMediaQuery,
  Box,
  Avatar,
  ListItemSecondaryAction,
  Button,
  Skeleton,
  Fab,
} from "@material-ui/core";
import { createContext, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerItems from "../ListItems/Drawer";
import { signIn, useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { APPBAR_USER_QUERY } from "../../apollo/Queries/userQueries";
import { AppbarUserData, QueryIdVars } from "../../interfaces/QueryInterfaces";
import Image from "next/image";
import Appbar from "./Appbar";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SkeletonDrawer from "../ListItems/SkeletonDrawer";

export const AppContext = createContext<boolean>(null);
const drawerWidth = "24vw";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}`,
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  maxWidth: "100%",
  marginTop: "24px"
}));

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

const AppWrap = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [session, loading] = useSession();
  const mobile = useMediaQuery(`(max-width: 900px)`);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const { data: user, fetchMore: moreNotif } = useQuery<
    AppbarUserData,
    QueryIdVars
  >(APPBAR_USER_QUERY, {
    variables: {
      id: session?.id,
      limit: 4,
    },
    skip: !session,
  });

  return (
    <>
      {!mobile ? (
        <>
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
            open={open}
          >
            <List>
              {session && !loading && user ? (
                <ListItem>
                  <ListItemIcon>
                    {user?.userId.image ? (
                      <Image
                        src={user.userId.image}
                        width={40}
                        height={40}
                        className={styles.avatar}
                        alt={"User Image"}
                      />
                    ) : (
                      <Avatar src="" />
                    )}
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
              ) : !session && !loading ? (
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
              ) : (
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
              )}
              <Divider />
              {!loading ? (
                <DrawerItems
                  userName={user?.userId.name}
                  admin={user?.userId.admin}
                />
              ) : (
                <SkeletonDrawer />
              )}
            </List>
          </Drawer>

          <Fab
            color="primary"
            onClick={handleDrawer}
            variant="extended"
            sx={{ position: "fixed", top: 8, left: 8, zIndex: 1 }}
          >
            <MenuIcon />
            <Image
              src="/obra-logo.png"
              height={40}
              width={40}
              alt={"Obra Logo"}
            />
            <Typography variant="h6" noWrap>
              Obra
            </Typography>
          </Fab>

          <AppContext.Provider value={mobile ? false : open}>
            <Main open={open}>{children}</Main>
          </AppContext.Provider>
        </>
      ) : (
        <>
          <Appbar fetchMore={moreNotif} user={user} />
          <AppContext.Provider value={mobile ? false : open}>
            <Box marginTop="80px">{children}</Box>
          </AppContext.Provider>
        </>
      )}
    </>
  );
};

export default AppWrap;
