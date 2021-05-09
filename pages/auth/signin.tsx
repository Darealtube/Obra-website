import { getCsrfToken, getProviders, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import {
  Paper,
  Container,
  Button,
  Typography,
  Divider,
  Box,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import styles from "../styles/General/Login.module.css";
import Head from "next/head";

export default function SignIn({ Providers, csrf }) {
  const router = useRouter();

  return (
    <div className={styles.login}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Sign In</title>
      </Head>
      <CssBaseline />
      <Paper className={styles.paper2}>
        <Container className={styles.container}>
          {Object.values(Providers)
            .filter((provider: any) => provider.name != "Email")
            .map((provider: any) => (
              <Container
                key={provider.name}
                style={{ marginTop: "24px", marginBottom: "24px" }}
              >
                <a
                  href={provider.signinUrl}
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Button
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: router.query.callbackUrl as string,
                      })
                    }
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    className={`${styles.btn}`}
                  >
                    <Typography className={styles.text}>
                      Sign in with {provider.name}
                    </Typography>
                  </Button>
                </a>
              </Container>
            ))}
          <Divider />
        </Container>

        <Box display="flex" alignContent="flex-end">
          <Container style={{ marginBottom: "24px" }}>
            <form
              method="post"
              action="/api/auth/signin/email"
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-end",
              }}
            >
              <input name="csrfToken" type="hidden" defaultValue={csrf} />
              <TextField
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
              />
              <br />
              <Button
                type="submit"
                variant="outlined"
                color="inherit"
                fullWidth
                className={styles.email}
              >
                <Typography className={styles.text}>
                  Sign in with Email
                </Typography>
              </Button>
            </form>
          </Container>
        </Box>
      </Paper>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const Providers = await getProviders();
  const csrf = await getCsrfToken(context);
  return {
    props: { Providers, csrf },
  };
}
