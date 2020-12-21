import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
}));

const Create = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Grid container className={classes.grid}>
        <Grid item sm={4} md={7}>
          {/* Art Image here */}
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
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
                    variant="standard"
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
                  >
                    <FormLabel component="legend">Is it for Sale?</FormLabel>
                    <RadioGroup row aria-label="Sale" name="Sale">
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
                  {/* Price (continue tomorrow) */}
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Create;
