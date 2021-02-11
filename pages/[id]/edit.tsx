import NumberFormat from "react-number-format";
import { Palette } from "@material-ui/icons";
import React from "react";
import {
  CssBaseline,
  Paper,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import Appbar from "../../Components/Appbar";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/General/Create.module.css";
import { fetchAPost, fetchUser } from "../../utils/fetchData";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { UserData } from "../../interfaces/UserInterface";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { PostInterface } from "../../interfaces/PostInterface";
import { EDIT_POST_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";

const Create = ({
  user,
  postId,
}: {
  user: UserData;
  postId: PostInterface;
}) => {
  const [post, setPost] = React.useState({
    title: postId.title,
    description: postId.description,
    art: postId.art,
    price: postId.price,
    sale: postId.sale,
    tags: postId.tags as string[],
  });
  const [edit] = useMutation(EDIT_POST_MUTATION);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    edit({
      variables: {
        postId: postId.id,
        title: post.title,
        description: post.description,
        tags: post.tags,
      },
    });
    router.push("/home");
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Grid container className={styles.grid}>
        <Grid item xs={false} sm={4} md={7} className={styles.displayArt}>
          {/* Art Display */}
          <div className={styles.artContainer}>
            <Image
              src={post.art}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
          {/* Art Display */}
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    color="primary"
                    onChange={handleChange}
                    defaultValue={post.title}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="none"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    color="primary"
                    rows={8}
                    multiline={true}
                    rowsMax={4}
                    onChange={handleChange}
                    defaultValue={post.description}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    component="fieldset"
                    disabled
                  >
                    <FormLabel component="legend">Is it for Sale?</FormLabel>
                    <RadioGroup
                      row
                      aria-label="Sale"
                      name="sale"
                      onChange={handleChange}
                      value={post.sale}
                    >
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl margin="normal" variant="outlined">
                    <FormLabel component="legend">Price</FormLabel>
                    <div style={{ marginTop: ".5em" }}>
                      <NumberFormat
                        value={post.price}
                        displayType={"input"}
                        thousandSeparator={true}
                        prefix={"₱"}
                        disabled
                        inputMode="numeric"
                        allowNegative={false}
                        className={styles.price}
                        isNumericString={true}
                        onValueChange={(values) => {
                          setPost({
                            ...post,
                            price: values.value,
                          });
                        }}
                      />
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="tags"
                    label="Tags"
                    name="tags"
                    color="secondary"
                    placeholder="Seperate tags with comma (,) and input atleast 1 Tag"
                    rows={2}
                    multiline={true}
                    onChange={handleTags}
                    defaultValue={post.tags}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<Palette />}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {/* Form */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const postId = await fetchAPost(context.params.id as string);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  if (session) {
    const user = await fetchUser(session.user.name);

    return {
      props: {
        user: user || null,
        postId,
      },
    };
  }

  return {
    props: {},
  };
};

export default Create;
