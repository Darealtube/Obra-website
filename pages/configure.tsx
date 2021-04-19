import { CssBaseline, Paper } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles/General/Configure.module.css";
import React, { useState, useMemo, useReducer } from "react";
import countryList from "react-select-country-list";
import "react-calendar/dist/Calendar.css";
import { useMutation } from "@apollo/client";
import { CONFIG_MUTATION } from "../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { reducer, State } from "../Hooks/Reducers/ConfigReducer";
import { ConfigData, ConfigVars } from "../interfaces/MutationInterfaces";

const DynamicDate = dynamic(
  () => import("../Components/MainPopovers/DatePopover")
);
const DynamicSnack = dynamic(
  () => import("../Components/Forms/Snackbars/ConfigSnack")
);
const DynamicConfig = dynamic(() => import("../Components/Forms/ConfigUser"));
const DynamicConfig2 = dynamic(() => import("../Components/Forms/ConfigUser2"));

const customStyles = {
  control: (base) => ({
    ...base,
    height: "4em",
    marginTop: "16px",
  }),
};

const initState: State = {
  name: "",
  age: "",
  country: "",
  language: "",
  birthday: new Date(),
  phone: "",
  artLevel: "",
  artStyles: [] as string[],
  artKinds: [] as string[],
  page: 1,
  error: false,
  errMessage: "",
};

const Configure = () => {
  const countries: { value: string; label: string }[] = useMemo(
    () => countryList().getData(),
    []
  );
  const [user, dispatch] = useReducer(reducer, initState);
  const [session] = useSession();
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const [configUser] = useMutation<ConfigData, ConfigVars>(CONFIG_MUTATION);

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "ERROR", payload: false });
  };

  const handleCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdateAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setdateAnchor(null);
  };

  const handleDate = (value: Date) => {
    dispatch({ type: "DATE_CHANGE", payload: value });
    setdateAnchor(null);
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
        {user.page == 1 ? (
          <DynamicConfig
            handleCalendar={handleCalendar}
            user={user}
            dispatch={dispatch}
            countries={countries}
            selectStyle={customStyles}
          />
        ) : (
          <DynamicConfig2
            dispatch={dispatch}
            user={user}
            session={session}
            configUser={configUser}
          />
        )}
      </Paper>

      <DynamicDate
        dateAnchor={dateAnchor}
        handleClose={handleCalendarClose}
        handleDate={handleDate}
        initValue={user.birthday}
      />

      <DynamicSnack
        error={user.error}
        errMessage={user.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};

export default Configure;
