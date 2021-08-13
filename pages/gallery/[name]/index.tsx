import Head from "next/head";
import {
  Container,
  Typography,
  Divider,
  CircularProgress,
  Box,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import styles from "../../styles/Specific/Gallery.module.css";
import Appbar from "../../../Components/Appbar/Appbar";
import { useQuery } from "@apollo/client";
import { USER_GALLERY_QUERY } from "../../../apollo/apolloQueries";
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import ArtList from "../../../Components/ArtList";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

const Gallery = () => {
  const sm = useMediaQuery("(max-width: 960px)");
  const router = useRouter();
  const name = router.query.name as string;
  const { data, fetchMore, loading } = useQuery<UserData, QueryNameVars>(
    USER_GALLERY_QUERY,
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
        <title>{name ? `${name}'s Gallery` : "Gallery"}</title>
      </Head>
      <Appbar />
      <Container className={styles.content} sx={{ marginTop: "80px" }}>
        {!data?.userName && name && !loading ? (
          <>
            <DefaultErrorPage statusCode={404} />
          </>
        ) : data?.userName && name ? (
          <>
            <Box
              display="flex"
              flexDirection={sm ? "column" : "row"}
              marginBottom={2}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={data?.userName.image}
                width={80}
                height={80}
                className={styles.avatar}
                alt={"User Avatar"}
              />
              <Typography
                variant="h4"
                style={{ marginLeft: "8px", flexGrow: 1 }}
                align={sm ? "center" : "inherit"}
              >
                {name}&apos;s Gallery
              </Typography>

              <Box display="flex">
                <Button
                  component="a"
                  href={`/gallery/${encodeURIComponent(name)}`}
                >
                  Gallery
                </Button>
                <Button
                  component="a"
                  href={`/gallery/${encodeURIComponent(name)}/liked`}
                >
                  Liked Gallery
                </Button>
              </Box>
            </Box>
            <Divider />
            <ArtList
              data={data?.userName.posts}
              fetchMore={fetchMore}
              first={"userName"}
              second={"posts"}
            />
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={30}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
