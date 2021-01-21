import dbConnect from "../../utils/dbConnect";
import Post from "../../model/Post";
import NumberFormat from "react-number-format";
import { Palette } from "@material-ui/icons";
import React from "react";
import {
  CssBaseline,
  Paper,
  Grid,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
  Input,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import Appbar from "../../Components/Appbar";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    height: "100vh",
  },
  price: {
    width: "100%",
    height: "2em",
  },
  displayArt: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    backgroundImage: "linear-gradient(65deg, #fff1e6, #ddbea9)",
  },
  artContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    marginTop: theme.spacing(8),
  },
}));

const Edit = ({ posts }) => {
  const classes = useStyles();
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
      const res = await fetch("api/Posts", {
        method: "PUT",
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
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        <Grid item xs={false} sm={4} md={7} className={classes.displayArt}>
          {/* Art Display */}
          <div className={classes.artContainer}>
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
          <div className={classes.paper}>
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
                    rows={4}
                    multiline={true}
                    rowsMax={6}
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
                        className={classes.price}
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

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();
  /* find all the data in our database */
  const result = await Post.find({});
  const posts = result.map((data) => {
    const post = data.toObject();
    post._id = post._id.toString();
    return post;
  });
  return { props: { posts: posts }, revalidate: 1 };
};

export default Edit;
