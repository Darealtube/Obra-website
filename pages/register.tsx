import Link from "next/link";
import React from "react";
import {
  Toolbar,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  makeStyles,
  Box,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://picsum.photos/500)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link href="#">Canvas</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <div>
      <Grid container className={classes.root}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Toolbar>
              <PaletteIcon fontSize="large" />
              <Typography variant="h4" color="inherit" noWrap>
                Canvas
              </Typography>
            </Toolbar>
            <br />
            <Typography variant="h5">Log In</Typography>

            <form className={classes.form}></form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  color="primary"
                  helperText="Optional."
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City/State"
                  name="city"
                  autoFocus
                  color="primary"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  <Link href="/home">
                    <span style={{ color: "white" }}>Register</span>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <Link href="/">Already have an account? Log in!</Link>
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </div>
  );
};

export default Register;
