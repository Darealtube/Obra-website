import { CssBaseline, Typography, Container, Divider } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import styles from "./styles/General/Home.module.css";
import { CardList } from "../Components/CardList";
import { PostInterface } from "../interfaces/PostInterface";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { POST_QUERY } from "../apollo/apolloQueries";
import { fetchPosts } from "../utils/fetchData";

interface PostData {
  posts: PostInterface[];
}

type Posts = {
  data: PostData;
  loading: Boolean;
};

const Home = () => {
  const [session] = useSession();
  const { data, loading: load } = useQuery(POST_QUERY) as Posts;

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
        {load ? "" : <CardList postData={data.posts} id={session?.id} />}

        {/* Featured list */}

        <Typography variant="h4">Recently</Typography>
        <Divider className={styles.divider} />
        {/* Recent posts list */}
        {load ? "" : <CardList postData={data.posts} id={session?.id} />}
        {/* Recent posts list */}
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
