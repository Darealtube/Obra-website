import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Container,
  IconButton,
} from "@material-ui/core";
import styles from "../../../pages/styles/Specific/Commission.module.css";
import CommList from "../Lists/CommList";
import Link from "next/link";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const NormalComm = ({ children, userId, loading, fetchMore, handleClick }) => {
  return (
    <div>
      <Grid container className={styles.wrapRoot}>
        <Grid item xs={8}>
          <Container>
            <Box display="flex">
              <Link href="/home">
                <IconButton component="a">
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Link>
              <Typography variant="h4">Commissions</Typography>
              <Divider />
            </Box>
            <Box
              display="flex"
              marginTop={4}
              position="relative"
              justifyContent="center"
              marginBottom={4}
              flexWrap="wrap"
            >
              <Link href="/commissions">
                <Button
                  variant="outlined"
                  component="a"
                  style={{ margin: "4px 4px 4px 4px" }}
                >
                  <Typography style={{ wordWrap: "break-word" }}>
                    Commissions
                  </Typography>
                </Button>
              </Link>
              <Button
                variant="outlined"
                style={{ margin: "4px 4px 4px 4px" }}
                onClick={handleClick}
              >
                <Typography style={{ wordWrap: "break-word" }}>
                  Your Commissions
                </Typography>
              </Button>
              <Button variant="outlined" style={{ margin: "4px 4px 4px 4px" }}>
                <Typography style={{ wordWrap: "break-word" }}>
                  Your Finished Commissions
                </Typography>
              </Button>
            </Box>
            <Box display="flex" flexDirection="column">
              {children}
            </Box>
          </Container>
        </Grid>
        <Grid item xs={4}>
          {!loading && userId && (
            <CommList commissions={userId.commissions} fetchMore={fetchMore} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default NormalComm;
