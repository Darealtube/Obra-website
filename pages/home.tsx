import {
  CssBaseline,
  Typography,
  Container,
  Divider,
  Button,
} from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import styles from "./styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import { PostInterface } from "../interfaces/PostInterface";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { NEW_POSTS_QUERY, POST_QUERY } from "../apollo/apolloQueries";
import { fetchPosts } from "../utils/fetchData";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import usePagination from "../Hooks/usePagination";

interface PostData {
  posts: PostInterface[];
}

type Posts = {
  data: PostData;
  loading: Boolean;
};

const Home = () => {
  const [session] = useSession();
  const {
    data: { posts },
    fetchMore,
  } = useQuery(POST_QUERY, {});
  const {
    data: { newPosts },
    fetchMore: moreNewPosts,
  } = useQuery(NEW_POSTS_QUERY);
  const { More } = usePagination("posts", fetchMore, posts);
  const { More: MoreNew } = usePagination("newPosts", moreNewPosts, newPosts);

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
        <CardList postData={posts} id={session?.id} />
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
        <CardList postData={newPosts} id={session?.id} />
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
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apollo = await fetchPosts();

  return {
    props: {
      initialApolloState: apollo,
    },
    revalidate: 60,
  };
};

export default Home;
