import {
  CssBaseline,
  Paper,
  Snackbar,
  Popover,
  IconButton,
} from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles/General/Configure.module.css";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { CONFIG_MUTATION } from "../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import ConfigUser from "../Components/Forms/ConfigUser";
import ConfigUser2 from "../Components/Forms/ConfigUser2";

const Configure = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const [user, setUser] = useState({
    name: "",
    age: "",
    country: "",
    language: "",
    birthday: new Date(),
    phone: "",
    artLevel: "",
    artStyles: [] as string[],
    artKinds: [] as string[],
  });
  const [session] = useSession();
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const [error, setError] = useState(false);
  const [errMessage, seterrMessage] = useState("");
  const [configUser] = useMutation(CONFIG_MUTATION);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prevpage) => prevpage + 1);
  };
  const prevPage = () => {
    setPage((prevpage) => prevpage - 1);
  };

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
        {page == 1 ? (
          <ConfigUser
            handleCalendar={handleCalendar}
            user={user}
            setUser={setUser}
            countries={countries}
            selectStyle={customStyles}
            nextPage={nextPage}
            setError={setError}
            seterrMessage={seterrMessage}
          />
        ) : (
          <ConfigUser2
            setUser={setUser}
            user={user}
            prevPage={prevPage}
            setError={setError}
            seterrMessage={seterrMessage}
            session={session}
            configUser={configUser}
          />
        )}
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
