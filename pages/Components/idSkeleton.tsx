import {
  Theme,
  makeStyles,
  CssBaseline,
  createStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  Container,
  CardActions,
  Divider,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Appbar from "../Components/Appbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grid: {
      height: "100%",
      position: "relative",
    },
    artContainer: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 500,
      height: 500,
    },
    appBarSpacer: theme.mixins.toolbar,
    information: {
      display: "flex",
      flexDirection: "column",
    },
    tag: {
      marginRight: theme.spacing(0.2),
    },
    postInfo: {
      display: "flex",
      position: "relative",
      justifyContent: "flex-start",
      marginTop: theme.spacing(10),
    },
    recommended: {
      marginTop: theme.spacing(10),
    },
    card: {
      width: "20em",
      marginBottom: theme.spacing(2),
    },
    recommendedList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
    dialog: {
      width: "100em",
      Height: "100em",
      position: "relative",
    },
  })
);

const SkeletonPost = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        <Grid item lg={8} className={classes.postInfo}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} className={classes.artContainer}>
                <Skeleton
                  variant="rect"
                  width={500}
                  height={500}
                  animation="wave"
                />
              </Grid>
              <Grid item lg={6} className={classes.information}>
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <Typography variant="h4" style={{ wordWrap: "break-word" }}>
                      <Skeleton animation="wave" />
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="subtitle1">
                      <Skeleton animation="wave" />
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">
                      <Skeleton animation="wave" />
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Skeleton animation="wave" />
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="body1"
                      style={{ wordWrap: "break-word" }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Skeleton animation="wave" />
                  </Grid>
                  <Grid item lg={4}>
                    <Skeleton animation="wave" />
                  </Grid>
                  <Grid item lg={4}>
                    <Skeleton animation="wave" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="h2">
              <Skeleton animation="wave" />
            </Typography>
          </Container>
        </Grid>
        <Grid item lg={4} className={classes.recommended}>
          <Container>
            <Typography variant="h4">
              <Skeleton animation="wave" />
            </Typography>
            <Divider />
            <Container className={classes.recommendedList}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Skeleton
                      variant="circle"
                      width={40}
                      height={40}
                      animation="wave"
                    />
                  }
                  title={<Skeleton animation="wave" />}
                  subheader={<Skeleton animation="wave" />}
                />
                <Skeleton variant="rect" animation="wave" height={190} />
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      <Skeleton animation="wave" />
                    </Typography>
                    <br />
                    <Skeleton animation="wave" />
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Skeleton animation="wave" />
                </CardActions>
              </Card>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SkeletonPost;
