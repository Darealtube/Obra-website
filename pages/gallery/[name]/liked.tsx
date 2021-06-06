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
import Gridlist from "../../../Components/GridList";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const LikedGallery = () => {
  const router = useRouter();
  const name = router.query.name as string;
  const { data, fetchMore } = useQuery<UserData, UserVars>(
    USER_LIKED_GALLERY_QUERY,
    {
      variables: {
        name: name,
        limit: 4,
      },
      skip: !name,
    }
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
        {data && name ? (
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

              <Link href={`/gallery/${encodeURIComponent(name)}`}>
                <Button component="a">Gallery</Button>
              </Link>
              <Link href={`/gallery/${encodeURIComponent(name)}/liked`}>
                <Button component="a">Liked Gallery</Button>
              </Link>
            </Box>
            <Divider />
            <Gridlist
              data={data?.userName.likedPosts}
              
              fetchMore={fetchMore}
              first={"userName"}
              second={"likedPosts"}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
};

export default LikedGallery;
