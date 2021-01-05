import { useRouter } from "next/router";
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
  Box,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import Image from "next/image";
import styles from "./styles/General/Register.module.css";

const Register = () => {
  const router = useRouter();
  const requirements = [
    { label: "Username", size: 6 as 6 },
    { label: "Password", size: 6 as 6 },
    { label: "Email", size: 4 as 4 },
    { label: "Age", size: 4 as 4 },
    { label: "Phone", size: 4 as 4 },
    { label: "Country", size: 6 as 6 },
    { label: "City", size: 6 as 6 },
  ];

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
              <Grid container spacing={2}>
                {/* Form */}
                {requirements.map((requirement) => (
                  <Grid item xs={requirement.size}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id={requirement.label}
                      label={requirement.label}
                      name={requirement.label}
                      autoFocus
                      color="primary"
                    />
                  </Grid>
                ))}
                {/* Form */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                  >
                    <span style={{ color: "white" }}>Register</span>
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Typography style={{ textDecoration: "none" }}>
                    <Link href="/">Already have an account? Log in!</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
          {/*Copyright*/}
          <Box mt={5}>
            <Copyright />
          </Box>
          {/*Copyright*/}
        </Grid>
        {/* Form */}

        {/* Side Image */}
        <Grid item xs={false} sm={4} md={7} className={styles.sideImage}>
          <Image
            src="https://picsum.photos/700"
            alt="Scenery image"
            layout="fill"
            objectFit="cover"
            objectPosition="center right"
          />
        </Grid>
        {/* Side Image */}
      </Grid>
    </div>
  );
};

export default Register;
