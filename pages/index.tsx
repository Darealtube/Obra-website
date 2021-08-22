import { CssBaseline, Container, Typography, Fade } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import styles from "./styles/General/Home.module.css";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import {
  CATEGORY_QUERY,
  POPULAR_CATEGORIES_QUERY,
} from "../apollo/apolloQueries";
import {
  fetchHomeCategories,
  fetchPopularCategories,
} from "../utils/fetchData";
import { addApolloState } from "../apollo/apolloClient";
import CategoryList from "../Components/CategoryList";

const Home = () => {
  const {
    data: { popularCategories },
  } = useQuery(POPULAR_CATEGORIES_QUERY);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Fade in={true} timeout={1500}>
          <Typography gutterBottom variant="h1" align="center">
            Categories
          </Typography>
        </Fade>
        <CategoryList data={popularCategories} includeMoreButton={true} />
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apollo = await fetchHomeCategories();

  return addApolloState(apollo, {
    props: {},
    revalidate: 10,
  });
};

export default Home;
