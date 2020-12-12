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
  Grid,
} from "@material-ui/core";
import ListItems from "./Components/listItems";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    list: {
      width: "100%",
      height: "100vh",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
    },
    grow: {
      justifyContent: "flex-end",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appbar: {
      display: "flex",
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appbar}>
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
          <Typography variant="h6" noWrap>
            Material-UI
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
        <List className={classes.list}>
          <ListItems />
        </List>
      </Drawer>

      <div>
        <Grid>
          <Grid item xs={6}>
            <Typography>A</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>A</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
