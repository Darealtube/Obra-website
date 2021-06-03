import Head from "next/head";
import {
  CssBaseline,
  Container,
  Typography,
  Divider,
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import styles from "../../styles/Specific/Gallery.module.css";
import Appbar from "../../../Components/Appbar/Appbar";
import { useQuery } from "@apollo/client";
import { USER_GALLERY_QUERY } from "../../../apollo/apolloQueries";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Gridlist from "../../../Components/GridList";
import Image from "next/image";
import Link from "next/link";

const Gallery = ({ name }) => {
  const { data, fetchMore } = useQuery<UserData, UserVars>(USER_GALLERY_QUERY, {
    variables: {
      name: name,
      limit: 4,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    data?.userName.posts,
    4,
    "posts"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name ? `${name}'s Gallery` : "Gallery"}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Container className={styles.content}>
        {data ? (
          <>
            <Box display="flex" alignItems="center" marginBottom={2}>
              <Image
                src={data?.userName.image}
                width={80}
                height={80}
                className={styles.avatar}
              />
              <Typography
                variant="h4"
                style={{ marginLeft: "8px", flexGrow: 1 }}
              >
                {name}'s Gallery
              </Typography>

              <Link href={`/gallery/${name}`}>
                <Button>Gallery</Button>
              </Link>
              <Link href={`/gallery/${name}/liked`}>
                <Button>Liked Gallery</Button>
              </Link>
            </Box>
            <Divider />
            <InfiniteScroll
              dataLength={data?.userName.posts.edges.length}
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
              <Gridlist data={data?.userName.posts.edges} />
            </InfiniteScroll>
          </>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
};

export default Gallery;
