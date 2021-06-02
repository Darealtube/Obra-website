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
import {
  GALLERY_EXISTS,
  USER_LIKED_GALLERY_QUERY,
} from "../../../apollo/apolloQueries";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Gridlist from "../../../Components/GridList";
import { addApolloState } from "../../../apollo/apolloClient";
import { fetchAllUsers, fetchLikedGallery } from "../../../utils/fetchData";
import Image from "next/image";

const LikedGallery = ({ name }) => {
  const { data, fetchMore } = useQuery<UserData, UserVars>(
    USER_LIKED_GALLERY_QUERY,
    {
      variables: {
        name: name,
        limit: 4,
      },
    }
  );
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    data?.userName.likedPosts,
    4,
    "likedPosts"
  );

  const { data: exists } = useQuery(GALLERY_EXISTS, {
    variables: {
      userName: name,
    },
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name ? `${name}'s Liked Gallery` : "Liked Gallery"}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        {data && exists?.galleryExists && (
          <>
            <Box display="flex" alignItems="center" marginBottom={2}>
              <Image
                src={data?.userName.image}
                width={80}
                height={80}
                className={styles.avatar}
              />
              <Typography variant="h4" style={{ marginLeft: "8px" }}>
                {name}'s Liked Gallery
              </Typography>
            </Box>
            <Divider />
            <InfiniteScroll
              dataLength={data?.userName?.likedPosts.edges.length}
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
              <Gridlist data={data?.userName?.likedPosts.edges} />
            </InfiniteScroll>
          </>
        )}
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
  const { data, exists } = await fetchLikedGallery(
    context.params.name as string
  );

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

export default LikedGallery;