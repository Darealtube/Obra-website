import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  Toolbar,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import styles from "./styles/General/Login.module.css";

const Login = () => {
  const router = useRouter();

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
      <Grid container className={styles.root}>
        <CssBaseline />
        {/* Side Image */}
        <Grid item xs={12} sm={4} md={7} className={styles.sideImage}>
          <Image
            src="https://picsum.photos/600"
            alt="Scenery image"
            layout="fill"
            objectFit="cover"
            objectPosition="center left"
          />
        </Grid>
        {/* Side Image */}

        {/* Form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            <Toolbar>
              <PaletteIcon fontSize="large" />
              <Typography variant="h4" color="inherit" noWrap>
                Canvas
              </Typography>
            </Toolbar>
            <br />
            <Typography variant="h5">Log In</Typography>

            <form className={styles.form} onSubmit={() => router.push("/home")}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="primary"
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                color="primary"
                helperText="Don't share your password to anyone."
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
              >
                Log In
              </Button>
            </form>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  style={{ textDecoration: "none" }}
                  color="secondary"
                >
                  <Link href="#">Forgot Password?</Link>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" style={{ textDecoration: "none" }}>
                  <Link href="/register">Don't have an account? Sign up!</Link>
                </Typography>
              </Grid>
            </Grid>
          </div>
          {/*Copyright*/}
          <Copyright />
          {/*Copyright*/}
        </Grid>
        {/* Form */}
      </Grid>
    </div>
  );
};

export default Login;
