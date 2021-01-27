import { CssBaseline, Typography, Container, Divider } from "@material-ui/core";
import Appbar from "../Components/Appbar";
import styles from "../pages/styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import Head from "next/head";
import { Skeleton } from "@material-ui/lab";
import CardListSkeleton from "./CardListSkeleton";

const HomeSkeleton = () => {
  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Typography variant="h4">
          <Skeleton animation="wave" />
        </Typography>
        <Divider className={styles.divider} />
        {/* Featured list */}
        <CardListSkeleton />
        {/* Featured list */}
        <Typography variant="h4">
          <Skeleton animation="wave" />
        </Typography>
        <Divider className={styles.divider} />
        {/* Recent posts list */}
        <CardListSkeleton />
        {/* Recent posts list */}
      </Container>
    </div>
  );
};

export default HomeSkeleton;
