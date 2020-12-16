import {
  Drawer,
  Theme,
  makeStyles,
  CssBaseline,
  List,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  Popover,
  Box,
} from "@material-ui/core";
import { Items, Menu, Notification } from "./Components/listItems";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Feature, Recent } from "./Components/gridListItems";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    list: {
      width: "100%",
      height: "100%",
      maxWidth: 320,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
    },
    grow: {
      justifyContent: "flex-end",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    content: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
    },
    divider: {
      height: "10px",
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
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

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(true);
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);

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

  const handleBackdrop = () => {
    setIntro(!intro);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
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
              <Notification />
            </List>
          </Popover>

          <IconButton onClick={handleProfile}>
            <Avatar>D</Avatar>
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
              <Avatar>D</Avatar>
              <div style={{ marginLeft: "25px" }}>
                <Typography>Darryl Javier</Typography>
                <Typography>balah@gmail.com</Typography>
              </div>
            </Box>
            <Divider />
            <List className={classes.menu}>
              <Menu />
            </List>
          </Popover>
        </Toolbar>
      </AppBar>

      <Container className={classes.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={classes.divider} />
        <Feature />
        <Divider className={classes.divider} />
        <Typography variant="h4">Recently</Typography>
        <Recent />
      </Container>
      <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
        <List className={classes.list}>
          <Items />
        </List>
      </Drawer>
      <Dialog
        open={intro}
        keepMounted
        onClose={handleBackdrop}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Welcome to Canvas!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Canvas is a platform that blah blah blah blah... If you are new
            here, see the tutorial on how we do things around here. If not, you
            can go ahead and skip it. Have fun!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackdrop} color="primary">
            Skip
          </Button>
          <Button onClick={handleBackdrop} color="primary">
            Show me the way!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
