import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Toolbar,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Button,
  Fade,
  Box,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import styles from "./styles/General/Login.module.css";
import Head from "next/head";
import { getSession, signIn, useSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/#">Canvas</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  signIn("google", {
    callbackUrl: `https://obra-website.vercel.app/home`,
  });
};

const Login = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [load, setLoad] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    let timer1;
    if (!loading && !session) {
      timer1 = setTimeout(() => {
        setLoad(false);
      }, 3000);
    } else if (!loading && session) {
      router.push("/home");
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [loading]);

  useEffect(() => {
    let timer2;
    if (!load && !session) {
      timer2 = setTimeout(() => {
        setReveal(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timer2);
    };
  }, [load]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Obra</title>
      </Head>
      <CssBaseline />
      {reveal ? (
        <Fade in={reveal} timeout={1500}>
          <Grid container className={styles.root}>
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
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={styles.paper}>
                <Toolbar>
                  <PaletteIcon fontSize="large" />
                  <Typography variant="h4" color="inherit" noWrap>
                    Obra
                  </Typography>
                </Toolbar>
                <br />
                <Typography variant="h5">
                  Canvas is a website that focuses on Artists, giving them an
                  opportunity to shine amidst the shame that brings upon the Art
                  Community.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                  onClick={handleSignIn}
                >
                  Log In
                </Button>
              </div>
              {/*Copyright*/}
              <Copyright />
              {/*Copyright*/}
            </Grid>
            {/* Form */}
          </Grid>
        </Fade>
      ) : (
        <Fade in={load} timeout={500}>
          <Box
            display="flex"
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <Image src="/obra-logo.png" height={60} width={60} />
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              style={{ marginTop: "8px", marginLeft: "8px" }}
            >
              Obra
            </Typography>
          </Box>
        </Fade>
      )}
    </div>
  );
};

export default Login;
