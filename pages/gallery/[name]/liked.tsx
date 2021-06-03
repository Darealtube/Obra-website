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
import { USER_LIKED_GALLERY_QUERY } from "../../../apollo/apolloQueries";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Gridlist from "../../../Components/GridList";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name ? `${name}'s Liked Gallery` : "Liked Gallery"}</title>
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
                {name}'s Liked Gallery
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
              dataLength={data?.userName.likedPosts.edges.length}
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
              <Gridlist data={data?.userName.likedPosts.edges} />
            </InfiniteScroll>
          </>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
};

export default LikedGallery;
