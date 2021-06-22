import React, { useReducer } from "react";
import { CssBaseline, Paper, Grid, CircularProgress } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import Image from "next/image";
import styles from "./styles/General/Create.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/client";
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

const DynamicError = dynamic(
  () => import("../Components/Forms/Snackbars/ConfigSnack")
);

const initState: State = {
  title: "",
  description: "",
  art: "",
  price: "",
  sale: "No",
  tags: [] as string[],
  width: 0,
  height: 0,
  error: false,
  errMessage: "",
};

const Create = ({ id }: { id: string }) => {
  const [post, dispatch] = useReducer(reducer, initState);
  const [create] =
    useMutation<CreatePostData, CreatePostVars>(CREATE_POST_MUTATION);
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
            <PostForm
              post={post}
              create={create}
              id={id}
              setArt={setArt}
              dispatch={dispatch}
            />
          </div>
        </Grid>
      </Grid>

      <DynamicError
        error={post.error}
        errMessage={post.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: session.id,
    },
  };
};

export default Create;
