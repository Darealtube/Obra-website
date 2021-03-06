import { Container, Typography, Fade } from "@material-ui/core";
import styles from "./styles/General/Home.module.css";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { fetchHomeCategories } from "../utils/fetchData";
import { addApolloState } from "../apollo/apolloClient";
import CategoryList from "../Components/CategoryList";
import { POPULAR_CATEGORIES_QUERY } from "../apollo/Queries/categoryQueries";
import { PopularCategoriesData } from "../interfaces/QueryInterfaces";

const Home = () => {
  const {
    data: { popularCategories },
  } = useQuery<PopularCategoriesData>(POPULAR_CATEGORIES_QUERY);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home</title>
      </Head>
      <Container>
        <Fade in={true} timeout={1500}>
          <Typography gutterBottom variant="h3" align="center">
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
