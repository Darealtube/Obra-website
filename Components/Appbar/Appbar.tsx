import {
  Drawer,
  List,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { APPBAR_USER_QUERY, READ_NOTIF } from "../../apollo/apolloQueries";
import { useMutation, useQuery } from "@apollo/client";
import AppbarMenu from "./AppbarMenu";
import AppbarNoUser from "./AppbarNoUser";
import DrawerItems from "../ListItems/Drawer";
import styles from "../../pages/styles/Specific/Appbar.module.css";

const Appbar = () => {
  const [session, loading] = useSession();
  const { data: user } = useQuery(APPBAR_USER_QUERY, {
    variables: {
      id: session?.id,
    },
    skip: !session,
  });
  const [open, setOpen] = useState(false);
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);
  const [notifCount, setnotifCount] = useState(0);
  const [read] = useMutation(READ_NOTIF, {
    variables: {
      userId: session?.id,
    },
  });
  const swipeable = useMediaQuery(`(max-width: 480px)`);

  useEffect(() => {
    if (!loading && user && user.userId.notifRead) {
      setnotifCount(0);
    }

    if (!loading && user && !user.userId.notifRead) {
      setnotifCount(
        user.userId.notifications.length +
          (user.userId.newUser ? 1 : 0) +
          (user.userId.tutorial ? 1 : 0)
      );
    }
  }, [loading, user]);

  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setprofAnchor(null);
  };

  const handleNotif = (event: React.MouseEvent<HTMLButtonElement>) => {
    setnotifAnchor(event.currentTarget);
    if (!user?.userId.notifRead) {
      read({
        variables: {
          userId: session?.id,
        },
      });
    }
    setnotifCount(0);
  };

  const handleNotifClose = () => {
    setnotifAnchor(null);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* App Bar */}
      <AppBar>
        <Toolbar>
          {/* Drawer and Logo */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={styles.menuButton}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={styles.toolbarTitle}>
            Canvas
          </Typography>
          {/* Drawer and Logo */}
          {user && !loading ? (
            <AppbarMenu
              user={user}
              handleNotif={handleNotif}
              handleNotifClose={handleNotifClose}
              handleProfile={handleProfile}
              handleProfileClose={handleProfileClose}
              notifAnchor={notifAnchor}
              profAnchor={profAnchor}
              notifCount={notifCount}
            />
          ) : !user && !loading ? (
            <AppbarNoUser
              handleProfile={handleProfile}
              handleProfileClose={handleProfileClose}
              profAnchor={profAnchor}
            />
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      {/* App Bar */}

      {/* Drawer */}
      {swipeable ? (
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={handleDrawer}
          onOpen={handleDrawer}
        >
          <List className={styles.list}>
            <DrawerItems /> {/* Manage this later */}
          </List>
        </SwipeableDrawer>
      ) : (
        <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
          <List className={styles.list}>
            <DrawerItems /> {/* Manage this later */}
          </List>
        </Drawer>
      )}
      {/* Drawer */}
    </div>
  );
};

export default Appbar;
