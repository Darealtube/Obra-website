import {
  CssBaseline,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Popover,
  IconButton,
} from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles/General/Configure.module.css";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { CONFIG_MUTATION } from "../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Configure = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const [user, setUser] = useState({
    username: "",
    age: "",
    country: "",
    language: "",
    birthday: new Date(),
    phone: "",
  });
  const [session] = useSession();
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const [error, setError] = useState(false);
  const [errMessage, seterrMessage] = useState("");
  const router = useRouter();
  const [configUser] = useMutation(CONFIG_MUTATION);

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const handleCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdateAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setdateAnchor(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleDate = (value: Date) => {
    setUser({
      ...user,
      birthday: value,
      age: `${moment().diff(value, "years")}`,
    });
    setdateAnchor(null);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "4em",
      marginTop: "16px",
    }),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (+user.age <= 0 || +user.age > 100 || !Number.isInteger(+user.age)) {
      setError(true);
      seterrMessage("Entered age is invalid. Please change it.");
    } else if (
      +user.phone.length < 11 ||
      +user.phone.length > 11 ||
      !Number.isInteger(+user.age)
    ) {
      setError(true);
      seterrMessage("Entered phone number is invalid. Please change it.");
    } else {
      configUser({
        variables: {
          userId: session?.id,
          username: user.username,
          age: user.age,
          country: user.country,
          language: user.language,
          birthday: moment(user.birthday).format("l"),
          phone: user.phone,
        },
      });
      router.push("/home");
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Welcome</title>
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
              <Typography align="center">
                {" "}
                We will need additional information.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                color="primary"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: "16px" }}>
              <Button
                onClick={handleCalendar}
                className={styles.birthday}
                fullWidth
                color="primary"
                variant="contained"
              >
                {` Select Birthday:

                ${moment(user.birthday).format("MM/DD/YYYY")}
                
                `}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="filled"
                margin="normal"
                required
                id="age"
                label="Age"
                name="age"
                color="primary"
                fullWidth
                value={user.age}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <Select
                options={countries}
                onChange={(value) => {
                  setUser({
                    ...user,
                    country: value.label,
                    language: value.value,
                  });
                }}
                styles={customStyles}
                placeholder="Country"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="filled"
                margin="normal"
                required
                id="lang"
                label="Language"
                name="lang"
                color="primary"
                fullWidth
                value={user.language}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                margin="normal"
                required
                id="phone"
                label="Phone"
                name="phone"
                color="primary"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="outlined" color="primary">
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Popover
        anchorEl={dateAnchor}
        keepMounted
        open={Boolean(dateAnchor)}
        onClose={handleCalendarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Calendar
          className={["c1", "c2"]}
          value={user.birthday}
          onChange={handleDate}
        />
      </Popover>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert severity="error">
          {errMessage}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleErrorClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Configure;
