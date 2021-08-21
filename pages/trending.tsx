import Head from "next/head";
import {
  CssBaseline,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import styles from "./styles/General/Trending.module.css";
import Appbar from "../Components/Appbar/Appbar";
import { useQuery } from "@apollo/client";
import { TRENDING_POSTS_QUERY } from "../apollo/apolloQueries";
import {
  TrendingPostsData,
  PaginatedPostsVars,
} from "../interfaces/QueryInterfaces";
import ArtList from "../Components/ArtList";

const Trending = () => {
  const { data, fetchMore } = useQuery<TrendingPostsData, PaginatedPostsVars>(
    TRENDING_POSTS_QUERY,
    {
      variables: {
        limit: 20,
      },
    }
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Trending</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content} sx={{ marginTop: "80px" }}>
        <Typography variant="h2" gutterBottom align="center">
          Trending Posts
        </Typography>

        {data ? (
          <ArtList
            data={data?.trendingPosts}
            first={"trendingPosts"}
            fetchMore={fetchMore}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={30}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Trending;
