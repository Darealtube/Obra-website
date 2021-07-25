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
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import {
  FEATURED_POSTS_QUERY,
  HOME_RECOMMENDED_QUERY,
  NEW_POSTS_QUERY,
} from "../apollo/apolloQueries";
import { fetchPosts } from "../utils/fetchData";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import usePagination from "../Hooks/usePagination";
import {
  FeaturedPostsData,
  HomeUserData,
  NewPostsData,
  PaginatedPostsVars,
  QueryIdVars,
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
    QueryIdVars
  >(HOME_RECOMMENDED_QUERY, {
    variables: {
      id: session?.id,
      limit: 4,
    },
    skip: !session,
  });
  
  const { More } = usePagination({
    key: "featuredPosts",
    fetchMore,
    info: featuredPosts,
    limit: 4,
  });
  
  const { More: MoreNew } = usePagination({
    key: "newPosts",
    fetchMore: moreNewPosts,
    info: newPosts,
    limit: 4,
  });

  const { More: MoreRecc, hasMore } = usePagination({
    key: "userId",
    fetchMore: moreRecommended,
    info: data?.userId.homeRecommended,
    limit: 4,
    key2: "homeRecommended",
  });

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
