import NumberFormat from "react-number-format";
import AvatarEditor from "react-avatar-editor";
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
} from "@material-ui/core";
import Appbar from "./Components/Appbar";

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
  art: {
    marginTop: theme.spacing(8),
  },
}));

const Create = () => {
  const classes = useStyles();
  const [sale, setSale] = React.useState("No");
  const [price, setPrice] = React.useState("");

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
        <Grid item xs={false} sm={4} md={7}>
          <input
            type="file"
            name="image"
            accept="image/*"
            className={classes.art}
          />
          {/* Continue tomorrow using NEXTJS 10 IMAGES!!!!*/}
        </Grid>
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
                    rows={4}
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
