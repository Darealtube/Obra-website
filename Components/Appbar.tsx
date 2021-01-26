import {
  Drawer,
  Theme,
  makeStyles,
  List,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Popover,
  Box,
  Button,
} from "@material-ui/core";
import { Items, Menu, Notification } from "./listItems";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { UserPropId } from "../interfaces/UserInterface";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetch from "unfetch";
import { Palette } from "@material-ui/icons";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      height: "100%",
      maxWidth: 320,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    menu: {
      height: "100%",
      overflow: "auto",
      width: "20em",
    },
    box: {
      margin: theme.spacing(2.5, 2),
    },
    notifmenu: {
      height: "100%",
      overflow: "auto",
      width: "100%",
      maxWidth: 568,
      maxHeight: 420,
    },
  })
);

const Appbar = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);
  const { data: user, error } = useSWR("/api/Users/", fetcher) as UserPropId;

  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setprofAnchor(null);
  };

  const handleNotif = (event: React.MouseEvent<HTMLButtonElement>) => {
    setnotifAnchor(event.currentTarget);
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
            className={classes.menuButton}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            Canvas
          </Typography>
          {/* Drawer and Logo */}
          {user ? (
            <div>
              <IconButton>
                <Link href={`/create`}>
                  <Palette fontSize="large" htmlColor="white" />
                </Link>
              </IconButton>
              <IconButton onClick={handleNotif}>
                <NotificationImportantIcon fontSize="large" htmlColor="white" />
              </IconButton>
              <Popover
                anchorEl={notifAnchor}
                keepMounted
                open={Boolean(notifAnchor)}
                onClose={handleNotifClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box className={classes.box}>
                  <Typography>Notifications</Typography>
                </Box>
                <Divider />
                <List className={classes.notifmenu}>
                  <Notification
                    notifications={user ? user.notifications : null}
                    user={user}
                  />
                </List>
              </Popover>
              <IconButton onClick={handleProfile}>
                {user.picture ? (
                  <Avatar src={user.picture} />
                ) : (
                  <Avatar>N</Avatar>
                )}
              </IconButton>
              <Popover
                id="simple-menu"
                anchorEl={profAnchor}
                keepMounted
                open={Boolean(profAnchor)}
                onClose={handleProfileClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box display="flex" flexWrap="wrap" className={classes.box}>
                  {user.picture ? (
                    <Avatar src={user.picture} />
                  ) : (
                    <Avatar>N</Avatar>
                  )}
                  <div style={{ marginLeft: "25px" }}>
                    {user.username || user.name ? (
                      <Typography>{user.name}</Typography>
                    ) : (
                      <Typography>No Name</Typography>
                    )}
                    {user.email ? (
                      <Typography>{user.email}</Typography>
                    ) : (
                      <Typography>No Email found</Typography>
                    )}
                  </div>
                </Box>
                <Divider />
                <List className={classes.menu}>
                  <Menu name={user.name} />
                </List>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => router.push("/api/Authentication/login")}>
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* App Bar */}

      {/* Drawer */}
      <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
        <List className={classes.list}>
          <Items /> {/* Manage this later */}
        </List>
      </Drawer>
      {/* Drawer */}
    </div>
  );
};

export default Appbar;
