import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Grid,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import styles from "../../styles/General/Create.module.css";
import Head from "next/head";
import { useSession } from "next-auth/client";
import {
  EDIT_POST_MUTATION,
  EDIT_POST_QUERY,
} from "../../../apollo/apolloQueries";
import { DataProxy, useMutation, useQuery } from "@apollo/client";
import EditPostForm from "../../../Components/Forms/EditPost";
import {
  EditPostData,
  EditPostVars,
} from "../../../interfaces/MutationInterfaces";
import { editPostUpdate } from "../../../utils/update";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import { PostData, QueryIdVars } from "../../../interfaces/QueryInterfaces";
import Link from "next/link";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

const DynamicNotAllowedDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoAccessDialog")
);
const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);

const Edit = () => {
  const router = useRouter();
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const [notAllowed, setnotAllowed] = useState(false);
  const { data, loading } = useQuery<PostData, QueryIdVars>(EDIT_POST_QUERY, {
    variables: {
      id: router.query.id as string,
    },
  });
  const [edit] = useMutation<EditPostData, EditPostVars>(EDIT_POST_MUTATION, {
    update: (cache: DataProxy, mutationResult) =>
      editPostUpdate(cache, mutationResult, data?.postId.id),
  });

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }

    if (data?.postId) {
      let allowed = session?.id == data?.postId?.author.id;

      if (!noSess && !loading && !allowed) {
        setnotAllowed(true);
      }
    }
  }, [session, sessload, data, noSess, loading]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit</title>
      </Head>
      <CssBaseline />
      {!data?.postId && !sessload && !loading ? (
        <Grid container className={styles.grid}>
          <Grid item xs={12}>
            <DefaultErrorPage statusCode={404} />
          </Grid>
        </Grid>
      ) : data?.postId && !loading && !noSess && !notAllowed ? (
        <>
          <Box display="flex" alignItems="center">
            <Link href="/" passHref>
              <IconButton component="a">
                <HomeOutlinedIcon fontSize="large" />
              </IconButton>
            </Link>
            <Typography variant="h4">Edit Art</Typography>
          </Box>
          <Container sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  width="100%"
                  height="70vh"
                  position="relative"
                  sx={{
                    backgroundImage: `url(${"/user-empty-backdrop.jpg"})`,
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src={data?.postId.watermarkArt}
                    layout="fill"
                    objectFit="contain"
                    alt={"Art Image or Placeholder"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <EditPostForm postId={data?.postId} edit={edit} />
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
    </div>
  );
};

export default Edit;
