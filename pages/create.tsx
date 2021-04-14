import { NumberFormatValues } from "react-number-format";
import React from "react";
import { CssBaseline, Paper, Grid, CircularProgress } from "@material-ui/core";
import Appbar from "../Components/Appbar/Appbar";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./styles/General/Create.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import { CREATE_POST_MUTATION, USER_ID_QUERY } from "../apollo/apolloQueries";
import { initializeApollo } from "../apollo/apolloClient";
import { useMutation, useQuery } from "@apollo/client";
import PostForm from "../Components/Forms/CreatePost";

const Create = ({ userData }) => {
  const [session] = useSession();
  const { data } = useQuery(USER_ID_QUERY, {
    variables: {
      id: session?.id,
    },
    skip: !session,
  });
  const [create] = useMutation(CREATE_POST_MUTATION);
  const [post, setPost] = React.useState({
    author: userData.id,
    title: "",
    description: "",
    art: "",
    price: "",
    sale: "No",
    date: moment().format("l"),
    tags: [] as string[],
  });
  const [loadings, setLoadings] = React.useState(false);
  const router = useRouter();

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    const data = new FormData();
    const { signature, timestamp } = await getSignature(); // Get returned sign and timestamp

    data.append("file", files[0]);
    data.append("signature", signature); // Signature
    data.append("timestamp", timestamp); // Timestamp
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    setLoadings(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );
    const file = await res.json();

    setPost((prevpost) => {
      return {
        ...prevpost,
        art: file.secure_url,
      };
    });
    setLoadings(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = (e.target as HTMLInputElement).value
      .split(",")
      .map((tag) => tag.replace(/\s+/, ""))
      .filter((tag) => tag !== "");
    setPost({
      ...post,
      tags: tags,
    });
  };

  React.useEffect(() => {
    if (post.sale === "No") {
      setPost({
        ...post,
        price: "",
      });
    }
  }, [post.sale]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create({
      variables: {
        author: post.author,
        title: post.title,
        description: post.description,
        art: post.art,
        price: post.price,
        sale: post.sale,
        date: post.date,
        tags: post.tags,
      },
    });
    router.push("/home");
  };

  const handleNumber = (values: NumberFormatValues) => {
    setPost({
      ...post,
      price: values.value,
    });
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
            {post.art && !loadings ? (
              <Image
                src={post.art}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            ) : loadings ? (
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

async function getSignature() {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/cloud_sign");
  //Get the response in JSON format
  const data = await response.json();
  //Extract signature and timestamp
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

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

  const { data } = await apolloClient.query({
    query: USER_ID_QUERY,
    variables: {
      id: session.id,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      userData: { id: data.userId.id },
    },
  };
};

export default Create;
