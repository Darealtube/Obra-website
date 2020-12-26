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
} from "@material-ui/core";
import Appbar from "./Components/Appbar";
import Image from "next/image";

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
  },
  artContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Create = () => {
  const classes = useStyles();
  const [sale, setSale] = React.useState("No");
  const [price, setPrice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  {
    /* Changes */
  }
  const [art, setArt] = React.useState("");
  {
    /* Changes */
  }

  /* Changes */

  // This will post to an unsigned preset in Cloudinary and shall not stay like that when
  // privacy matters. Turn this into an action that will post to a signed preset, with
  // signatures and all the things needed for that action in Cloudinary.
  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Japhil");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyuvjmyfy/image/upload",
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );

    const file = await res.json();
    setArt(file.secure_url);
    setLoading(false);
    // The Loading here is quite inaccurate, and it needs a bit of fixing. Basically, when it stops
    // "loading", even if the art is supposedly still 'GET'ting, (which will display none), the circular
    // progress component won't appear.
  };
  /* Changes */

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSale((e.target as HTMLInputElement).value);
  };

  React.useEffect(() => {
    if (sale === "No") {
      setPrice("");
    }
  }, [sale]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        {/* Changes */}
        <Grid item xs={false} sm={4} md={7} className={classes.displayArt}>
          <Container className={classes.artContainer}>
            {/* Fix this alongside the setLoading function, and the CSS */}
            {art && !loading ? (
              <Image
                src={art}
                width={500}
                height={500}
                objectPosition="center"
              />
            ) : loading ? (
              <CircularProgress />
            ) : (
              ""
            )}

            {/* We could possibly just use the cloudinary widget which handles the dropzone and 
                file uploading for us, I'm talking about CSS.
            */}

            {/* Fix this alongside the setLoading function, and the CSS */}
          </Container>
        </Grid>
        {/* Changes */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            {/* Form */}
            <form>
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
                  />
                </Grid>
                {/* Changes */}
                <Grid item xs={12}>
                  <Input type="file" name="image" onChange={handleArt} />
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
                    rows={4}
                    multiline={true}
                    rowsMax={8}
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
                      name="Sale"
                      onChange={handleSale}
                      value={sale}
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
                        value={price}
                        displayType={"input"}
                        thousandSeparator={true}
                        prefix={"₱"}
                        disabled={sale === "No" ? true : false}
                        inputMode="numeric"
                        allowNegative={false}
                        className={classes.price}
                        isNumericString={true}
                        onValueChange={(values) => {
                          setPrice(values.value);
                        }}
                        required={sale === "No" ? false : true}
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
                    rows={2}
                    multiline={true}
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

export default Create;
