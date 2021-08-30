import React, { useReducer, useRef, useState } from "react";
import {
  CssBaseline,
  CircularProgress,
  Typography,
  IconButton,
  Box,
  Container,
  Grid,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import styles from "./styles/General/Create.module.css";
import Head from "next/head";
import { useSession } from "next-auth/client";
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
import { PostValidate } from "../utils/postValidator";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import Link from "next/link";
import { CREATE_POST_MUTATION } from "../apollo/Mutations/postMutations";

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
  tags: [],
  tagInput: "",
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
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const { loading, setArt, placeholder } = useArt("");
  const inputFile = useRef<HTMLInputElement>();

  const handleArtClick = () => {
    inputFile.current.click();
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "ERROR", payload: false });
  };

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setDisabled(true);
      setArt((e.target as HTMLInputElement).files).then((values) => {
        dispatch({
          type: "CHANGE_ART",
          artPayload: values,
        });
        setDisabled(false);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const valid = PostValidate(post);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
      setDisabled(false);
    } else {
      create({
        variables: {
          author: session?.id,
          title: post.title,
          description: post.description,
          art: post.art,
          watermarkArt: post.watermarkArt,
          tags: post.tags.map((tag) => tag.name),
          width: post.width,
          height: post.height,
        },
      });
      router.push("/");
    }
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
      <Box display="flex" alignItems="center">
        <Link href="/" passHref>
          <IconButton component="a">
            <HomeOutlinedIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography variant="h4">Create</Typography>
      </Box>
      <Container sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                startIcon={<PhotoCameraOutlinedIcon />}
                onClick={handleArtClick}
              >
                <Typography>Change Art</Typography>
              </Button>
              <Box
                width="100%"
                height="70vh"
                position="relative"
                sx={{ backgroundImage: `url(${"/user-empty-backdrop.jpg"})` }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <input
                  type="file"
                  id="sampleArt"
                  name="sampleArt"
                  ref={inputFile}
                  style={{ display: "none" }}
                  onChange={handleArt}
                />
                {placeholder && !loading ? (
                  <>
                    <Image
                      src={placeholder}
                      layout="fill"
                      objectFit="contain"
                      alt={"Art Image or Placeholder"}
                    />
                  </>
                ) : loading ? (
                  <CircularProgress />
                ) : (
                  ""
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <PostForm post={post} dispatch={dispatch} disabled={disabled} />
            </Grid>
          </Grid>
        </form>
      </Container>

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
