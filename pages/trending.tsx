import { GetServerSideProps, GetStaticProps } from "next";
import { addApolloState } from "../apollo/apolloClient";
import { fetchTrendingPosts } from "../utils/fetchData";
import Head from "next/head";
import {
  CssBaseline,
  Container,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import styles from "./styles/General/Trending.module.css";
import Appbar from "../Components/Appbar/Appbar";
import { useQuery } from "@apollo/client";
import {
  FEATURED_POSTS_QUERY,
  TRENDING_POSTS_QUERY,
} from "../apollo/apolloQueries";
import {
  FeaturedPostsData,
  PaginatedPostsVars,
} from "../interfaces/QueryInterfaces";
import usePagination from "../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Gridlist from "../Components/GridList";

const Trending = () => {
  const {
    data: { featuredPosts },
    fetchMore,
  } = useQuery<FeaturedPostsData, PaginatedPostsVars>(FEATURED_POSTS_QUERY, {
    variables: {
      limit: 4,
    },
  });
  const { More, hasMore } = usePagination(
    "featuredPosts",
    fetchMore,
    featuredPosts,
    4
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Trending</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Typography variant="h4">Trending Posts</Typography>
        <Divider />
        <InfiniteScroll
          dataLength={featuredPosts.edges.length}
          next={More}
          hasMore={hasMore}
          loader={
            <>
              <br />
              <CircularProgress />
            </>
          }
          style={{
            overflow: "hidden",
          }}
          scrollThreshold={0.8}
        >
          <Gridlist data={featuredPosts.edges} />
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchTrendingPosts();
  return addApolloState(data, {
    props: {},
  });
};

export default Trending;
