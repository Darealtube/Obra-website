import { useQuery } from "@apollo/client";
import {
  Container,
  CssBaseline,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import { addApolloState } from "../../apollo/apolloClient";
import { CATEGORY_POSTS_QUERY } from "../../apollo/apolloQueries";
import Appbar from "../../Components/Appbar/Appbar";
import ArtList from "../../Components/ArtList";
import { fetchCategoryPosts } from "../../utils/fetchData";
import styles from "../styles/General/Home.module.css";
import Head from "next/head";

const Category = ({ category }) => {
  const xs = useMediaQuery("(max-width: 570px)");
  const sm = useMediaQuery("(max-width: 960px)");
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
        <Typography gutterBottom align="center" variant="h4">
          {categoryPosts.totalCount} art(s) in {category}
        </Typography>
        <ArtList
          data={categoryPosts}
          fetchMore={fetchMore}
          first={"categoryPosts"}
          columns={xs ? 1 : sm ? 2 : 3}
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