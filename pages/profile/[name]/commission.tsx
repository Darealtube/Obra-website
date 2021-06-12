import {
  Paper,
  Grid,
  Typography,
  TextField,
  Input,
  Button,
  CssBaseline,
  Slider,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import styles from "../../styles/Specific/Commission.module.css";
import Image from "next/image";
import Head from "next/head";
import { isSameUser } from "../../../utils/fetchData";
import { getSession, useSession } from "next-auth/client";
import { marks } from "../../../utils/Options";
import { useState, useRef } from "react";
import useArt from "../../../Hooks/useArt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useMutation } from "@apollo/client";
import { CREATE_COMMISSION_MUTATION } from "../../../apollo/apolloQueries";
import { useRouter } from "next/router";
import { addApolloState } from "../../../apollo/apolloClient";

const initState = {
  title: "",
  description: "",
  sampleArt: "",
  height: 0,
  width: 0,
  deadline: 3,
};

const Commission = ({ name }: { name: string }) => {
  const [session] = useSession();
  const router = useRouter();
  const [commissionArtist] = useMutation(CREATE_COMMISSION_MUTATION);
  const inputFile = useRef<HTMLInputElement>();
  const [commission, setCommission] = useState(initState);
  const { loading, setArt, placeholder } = useArt("/user-empty-backdrop.jpg");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommission({
      ...commission,
      [e.target.name]: e.target.value,
    });
  };
  const handleArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArt((e.target as HTMLInputElement).files).then((values) => {
      setCommission({
        ...commission,
        sampleArt: values.url,
      });
    });
  };
  const handleArtClick = () => {
    inputFile.current.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commissionArtist({
      variables: {
        artistName: name,
        userId: session?.id,
        title: commission.title,
        description: commission.description,
        width: +commission.width,
        height: +commission.height,
        deadline: commission.deadline,
        sampleArt: commission.sampleArt,
      },
    });
    router.push("/");
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commision {name}</title>
      </Head>
      <CssBaseline />
      <Image
        src="https://picsum.photos/600"
        alt="Scenery image"
        layout="fill"
        objectFit="cover"
        objectPosition="center left"
      />
      <Paper elevation={6} className={styles.paper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Commission {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                variant="filled"
                margin="normal"
                required
                color="primary"
                fullWidth
                label="Title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                color="primary"
                rows={3}
                multiline={true}
                rowsMax={4}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Deadline (days from now)</Typography>
              <Slider
                defaultValue={3}
                aria-labelledby="discrete-slider-custom"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                name="deadline"
                min={3}
                max={7}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography>Height</Typography>
              <Input
                type="number"
                name="height"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography>Width</Typography>
              <Input
                type="number"
                name="width"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={styles.sample}>
              {!loading ? (
                <>
                  <Image src={placeholder} layout="fill" objectFit="cover" />
                  <IconButton onClick={handleArtClick}>
                    <PhotoCameraIcon />
                  </IconButton>
                </>
              ) : (
                <CircularProgress />
              )}
              <input
                type="file"
                id="sampleArt"
                name="sampleArt"
                style={{ display: "none" }}
                ref={inputFile}
                onChange={handleArt}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="outlined">
                Submit Commission
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { same, data } = await isSameUser(
    session.id,
    context.params.name as string
  );

  if (same) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      name: context.params.name,
      session,
    },
  });
};

export default Commission;
