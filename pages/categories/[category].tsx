import { useQuery } from "@apollo/client";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { addApolloState } from "../../apollo/apolloClient";
import { CATEGORY_POSTS_QUERY } from "../../apollo/apolloQueries";
import Appbar from "../../Components/Appbar/Appbar";
import ArtList from "../../Components/ArtList";
import { fetchCategoryPosts } from "../../utils/fetchData";
import styles from "../styles/General/Home.module.css";
import Head from "next/head";

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
      <Container
        sx={{ display: "flex", flexDirection: "column", marginTop: "80px" }}
      >
        <Typography gutterBottom align="center" variant="h4">
          {categoryPosts.totalCount} art(s) in {category}
        </Typography>
        <ArtList
          data={categoryPosts}
          fetchMore={fetchMore}
          first={"categoryPosts"}
        />
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchCategoryPosts(context.params.category as string);

  return addApolloState(data, {
    props: {
      category: context.params.category,
    },
  });
};

export default Category;
