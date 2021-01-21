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
  Input,
  CircularProgress,
} from "@material-ui/core";
import Appbar from "../Components/Appbar";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./styles/General/Create.module.css";

const Create = () => {
  const [post, setPost] = React.useState({
    title: "",
    description: "",
    art: "",
    price: "",
    sale: "No",
    date: moment().format("l"),
    tags: [] as string[],
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    const data = new FormData();
    const { signature, timestamp } = await getSignature(); // Get returned sign and timestamp

    data.append("file", files[0]);
    data.append("signature", signature); // Signature
    data.append("timestamp", timestamp); // Timestamp
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    setLoading(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );

    const file = await res.json();
    setPost({
      ...post,
      art: file.secure_url,
    });
    setLoading(false);
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
    try {
      const res = await fetch("/api/Posts/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        throw new Error("404 not found");
      }

      router.push("/home");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Grid container className={styles.grid}>
        <Grid item xs={false} sm={4} md={7} className={styles.displayArt}>
          {/* Art Display */}
          <div className={styles.artContainer}>
            {post.art && !loading ? (
              <Image
                src={post.art}
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    color="primary"
                    onChange={handleChange}
                  />
                </Grid>
                {/* Changes */}
                <Grid item xs={12}>
                  <Input
                    type="file"
                    name="image"
                    onChange={handleArt}
                    required
                  />
                </Grid>
                {/* Changes */}
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
                <Grid item xs={6}>
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    component="fieldset"
                    required
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
                        disabled={post.sale === "No" ? true : false}
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
                        required={post.sale === "No" ? false : true}
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
                    required
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
                    Publish
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

async function getSignature() {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/cloud_sign");
  //Get the response in JSON format
  const data = await response.json();
  //Extract signature and timestamp
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

export default Create;
