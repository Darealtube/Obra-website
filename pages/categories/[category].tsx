import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ImageList,
  ImageListItem,
  Typography,
  Skeleton,
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
import { useRouter } from "next/router";

const skeletalArts = [
  { width: 160, height: 320 },
  { width: 920, height: 1080 },
  { width: 500, height: 500 },
  { width: 1800, height: 920 },
];

const Category = ({ category }) => {
  const router = useRouter();
  const { data, fetchMore } = useQuery(CATEGORY_POSTS_QUERY, {
    variables: {
      category,
      limit: 20,
    },
  });

  if (router.isFallback) {
    return (
      <>
        <Container className={styles.content}>
          <Box display="flex">
            <ImageList variant="masonry" cols={3} gap={8}>
              {skeletalArts.map((art) => (
                <>
                  <ImageListItem>
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangular"
                      width={art.width}
                      height={art.height}
                    />
                  </ImageListItem>
                </>
              ))}
            </ImageList>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{category ? category : " Loading Page..."}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        {data?.categoryPosts && (
          <>
            <Box display="flex">
              <Typography
                gutterBottom
                align="center"
                variant="h4"
                sx={{ flexGrow: 1 }}
              >
                {data?.categoryPosts.totalCount} art(s) in {category}
              </Typography>
              <Button variant="contained" onClick={() => router.reload()}>
                <Typography align="center">Refresh Results</Typography>
              </Button>
            </Box>
            <ArtList
              data={data?.categoryPosts}
              fetchMore={fetchMore}
              first={"categoryPosts"}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchPopularCategories();
  const paths = data.map((name) => ({
    params: { category: encodeURI(name) },
  }));
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
