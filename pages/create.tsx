import { NumberFormatValues } from "react-number-format";
import React, { useReducer } from "react";
import { CssBaseline, Paper, Grid, CircularProgress } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./styles/General/Create.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { CREATE_POST_MUTATION } from "../apollo/apolloQueries";
import { initializeApollo } from "../apollo/apolloClient";
import { useMutation } from "@apollo/client";
import PostForm from "../Components/Forms/CreatePost";
import { reducer, State } from "../Hooks/Reducers/PostReducer";
import useArt from "../Hooks/useArt";
import { fetchUser } from "../utils/fetchData";
import {
  CreatePostData,
  CreatePostVars,
} from "../interfaces/MutationInterfaces";

const initState: State = {
  title: "",
  description: "",
  art: "",
  price: "",
  sale: "No",
  tags: [] as string[],
};

const Create = ({ id }: { id: string }) => {
  const router = useRouter();
  const [create] = useMutation<CreatePostData, CreatePostVars>(
    CREATE_POST_MUTATION
  );
  const [post, dispatch] = useReducer(reducer, initState);
  const { loading, setArt, placeholder } = useArt("");

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setArt((e.target as HTMLInputElement).files).then((values) => {
      dispatch({
        type: "CHANGE",
        field: "art",
        payload: values.url,
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "TAGS", payload: (e.target as HTMLInputElement).value });
  };

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SALE", payload: (e.target as HTMLInputElement).value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create({
      variables: {
        author: id,
        title: post.title,
        description: post.description,
        art: post.art,
        price: post.price,
        sale: post.sale,
        date: moment().format("l"),
        tags: post.tags,
      },
    });
    router.push("/home");
  };

  const handleNumber = (values: NumberFormatValues) => {
    dispatch({ type: "CHANGE", field: "price", payload: values.value });
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
              handleSale={handleSale}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleArt={handleArt}
              handleTags={handleTags}
              handleNumber={handleNumber}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const apolloClient = initializeApollo();
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const data = await fetchUser(session.id as string);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: data.id,
    },
  };
};

export default Create;
