import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { addApolloState } from "../../apollo/apolloClient";
import { CATEGORY_POSTS_QUERY } from "../../apollo/apolloQueries";
import Appbar from "../../Components/Appbar/Appbar";
import ArtList from "../../Components/ArtList";
import {
  fetchCategoryPosts,
  fetchPopularCategories,
} from "../../utils/fetchData";
import styles from "../styles/General/Home.module.css";
import Head from "next/head";
import router from "next/router";

const Category = ({ category }) => {
  const {
    data: { categoryPosts },
    fetchMore,
  } = useQuery(CATEGORY_POSTS_QUERY, {
    variables: {
      category,
      limit: 20,
    },
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{category}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Box display="flex">
          <Typography
            gutterBottom
            align="center"
            variant="h4"
            sx={{ flexGrow: 1 }}
          >
            {categoryPosts.totalCount} art(s) in {category}
          </Typography>
          <Button variant="contained" onClick={() => router.reload()}>
            <Typography align="center">Refresh Results</Typography>
          </Button>
        </Box>
        <ArtList
          data={categoryPosts}
          fetchMore={fetchMore}
          first={"categoryPosts"}
        />
      </Container>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchPopularCategories();
  const paths = data.map((name) => ({ params: { category: name } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchCategoryPosts(context.params.category as string);

  return addApolloState(data, {
    props: {
      category: context.params.category,
    },
    revalidate: 10,
  });
};

export default Category;
