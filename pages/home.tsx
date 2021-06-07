import {
  CssBaseline,
  Typography,
  Container,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import styles from "./styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  FEATURED_POSTS_QUERY,
  HOME_RECOMMENDED_QUERY,
  NEW_POSTS_QUERY,
} from "../apollo/apolloQueries";
import { fetchPosts } from "../utils/fetchData";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import usePagination from "../Hooks/usePagination";
import { useEffect } from "react";
import {
  FeaturedPostsData,
  HomeUserData,
  HomeUserVars,
  NewPostsData,
  PaginatedPostsVars,
} from "../interfaces/QueryInterfaces";
import { addApolloState } from "../apollo/apolloClient";

const Home = () => {
  const [session] = useSession();
  const {
    data: { featuredPosts },
    fetchMore,
  } = useQuery<FeaturedPostsData, PaginatedPostsVars>(FEATURED_POSTS_QUERY, {
    variables: {
      limit: 4,
    },
  });
  const {
    data: { newPosts },
    fetchMore: moreNewPosts,
  } = useQuery<NewPostsData, PaginatedPostsVars>(NEW_POSTS_QUERY, {
    variables: {
      limit: 4,
    },
  });
  const { data, fetchMore: moreRecommended } = useQuery<
    HomeUserData,
    HomeUserVars
  >(HOME_RECOMMENDED_QUERY, {
    variables: {
      id: session?.id,
      limit: 4,
    },
    skip: !session,
  });
  const { More } = usePagination("featuredPosts", fetchMore, featuredPosts, 4);
  const { More: MoreNew } = usePagination(
    "newPosts",
    moreNewPosts,
    newPosts,
    4
  );
  const { More: MoreRecc, hasMore } = usePagination(
    "userId",
    moreRecommended,
    data?.userId.homeRecommended,
    4,
    "homeRecommended"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Typography variant="h4">Featured</Typography>
        <Divider className={styles.divider} />
        {/* Featured list */}
        <CardList postData={featuredPosts.edges} />
        <br />
        <Button
          onClick={More}
          className={styles.moreButton}
          startIcon={<ExpandMoreIcon />}
        >
          {" "}
        </Button>
        <Divider className={styles.divider} />
        {/* Featured list */}
        <br />
        <Typography variant="h4">Recently</Typography>
        <Divider className={styles.divider} />
        <br />
        {/* Recent posts list */}
        <CardList postData={newPosts.edges} />
        <br />
        <Button
          onClick={MoreNew}
          className={styles.moreButton}
          startIcon={<ExpandMoreIcon />}
        >
          {" "}
        </Button>
        {/* Recent posts list */}
        <Divider className={styles.divider} />
        <br />
        <Typography variant="h4">Recommended</Typography>
        <Divider className={styles.divider} />
        <br />
        {data && (
          <InfiniteScroll
            dataLength={data?.userId.homeRecommended.edges.length}
            next={MoreRecc}
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
            <CardList postData={data?.userId.homeRecommended.edges} />
          </InfiniteScroll>
        )}
        <br />
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const apollo = await fetchPosts(session?.id);

  return addApolloState(apollo, {
    props: {
      session,
    },
  });
};

export default Home;
