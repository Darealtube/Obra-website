import {
  Theme,
  makeStyles,
  CssBaseline,
  createStyles,
  Typography,
  Container,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useState } from "react";
import { Feature, Recent } from "./Components/gridListItems";
import Appbar from "./Components/Appbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      marginTop: theme.spacing(10),
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
  })
);

const Home = () => {
  const classes = useStyles();
  const [intro, setIntro] = useState(true);

  const handleBackdrop = () => {
    setIntro(!intro);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Container className={classes.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={classes.divider} />
        <Feature />
        <Divider className={classes.divider} />
        <Typography variant="h4">Recently</Typography>
        <Recent />
      </Container>

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
