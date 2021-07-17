import React, { useReducer, useState } from "react";
import { CssBaseline, Paper, Grid, CircularProgress } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import Image from "next/image";
import styles from "./styles/General/Create.module.css";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { CREATE_POST_MUTATION } from "../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import PostForm from "../Components/Forms/CreatePost";
import { reducer, State } from "../Hooks/Reducers/PostReducer";
import useArt from "../Hooks/useArt";
import {
  CreatePostData,
  CreatePostVars,
} from "../interfaces/MutationInterfaces";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicError = dynamic(
  () => import("../Components/Forms/Snackbars/ConfigSnack")
);

const DynamicNoSessDialog = dynamic(
  () => import("../Components/MainPopovers/NoSessionDialog")
);

const initState: State = {
  title: "",
  description: "",
  art: "",
  watermarkArt: "",
  price: "",
  sale: "No",
  tags: [] as string[],
  width: 0,
  height: 0,
  error: false,
  errMessage: "",
};

const Create = () => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const [post, dispatch] = useReducer(reducer, initState);
  const [create] = useMutation<CreatePostData, CreatePostVars>(
    CREATE_POST_MUTATION
  );
  const { loading, setArt, placeholder } = useArt("");

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "ERROR", payload: false });
  };

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Create</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <Grid item xs={12} sm={6} md={7} className={styles.displayArt}>
          {/* Art Display */}
          <div className={styles.artContainer}>
            {placeholder && !loading ? (
              <Image
                src={placeholder}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt={"Art Image or Placeholder"}
              />
            ) : loading ? (
              <CircularProgress />
            ) : (
              ""
            )}
          </div>
          {/* Art Display */}
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            {!noSess && (
              <PostForm
                post={post}
                create={create}
                id={session?.id}
                setArt={setArt}
                dispatch={dispatch}
              />
            )}
          </div>
        </Grid>
      </Grid>

      <DynamicError
        error={post.error}
        errMessage={post.errMessage}
        handleErrorClose={handleErrorClose}
      />
      <DynamicNoSessDialog open={noSess} />
    </div>
  );
};

export default Create;
