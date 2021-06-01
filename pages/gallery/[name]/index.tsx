import { GetStaticProps } from "next";
import Head from "next/head";
import {
  CssBaseline,
  Container,
  Typography,
  Divider,
  CircularProgress,
  Box,
} from "@material-ui/core";
import styles from "../../styles/Specific/Gallery.module.css";
import Appbar from "../../../Components/Appbar/Appbar";
import { useQuery } from "@apollo/client";
import { USER_GALLERY_QUERY } from "../../../apollo/apolloQueries";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Gridlist from "../../../Components/GridList";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchAllUsers, fetchGallery } from "../../../utils/fetchData";
import Image from "next/image";

const Gallery = ({ name }) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, UserVars>(USER_GALLERY_QUERY, {
    variables: {
      name: name,
      limit: 4,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName?.posts,
    4,
    "posts"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name}'s Gallery</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Image
            src={userName.image}
            width={80}
            height={80}
            className={styles.avatar}
          />
          <Typography variant="h4" style={{ marginLeft: "8px" }}>
            {name}'s Gallery
          </Typography>
        </Box>
        <Divider />
        <InfiniteScroll
          dataLength={userName.posts.edges.length}
          next={More}
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
          <Gridlist data={userName.posts.edges} />
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export const getStaticPaths = async () => {
  const userList = await fetchAllUsers();
  const paths = userList.map((name) => ({
    params: { name },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, exists } = await fetchGallery(context.params.name as string);

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      name: context.params.name,
    },
  });
};

export default Gallery;
