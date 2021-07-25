import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Paper,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import Appbar from "../../../Components/Appbar/Appbar";
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
    <div
      className={styles.root}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit</title>
      </Head>
      <CssBaseline />
      <Appbar />
      {!data?.postId && !sessload && !loading ? (
        <Grid container className={styles.grid}>
          <Grid item xs={12}>
            <DefaultErrorPage statusCode={404} />
          </Grid>
        </Grid>
      ) : data?.postId && !loading && !noSess && !notAllowed ? (
        <Grid container className={styles.grid}>
          <Grid item xs={false} sm={4} md={7} className={styles.displayArt}>
            {/* Art Display */}
            <div className={styles.artContainer}>
              <Image
                src={data?.postId.watermarkArt}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt={"Art Image"}
              />
            </div>
            {/* Art Display */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={styles.paper}>
              <EditPostForm
                postId={data?.postId}
                id={data?.postId.id}
                edit={edit}
              />
            </div>
          </Grid>
        </Grid>
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
