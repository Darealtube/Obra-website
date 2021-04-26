import { CssBaseline, Paper } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles/General/Configure.module.css";
import React, { useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import { useMutation } from "@apollo/client";
import { CONFIG_MUTATION } from "../apollo/apolloQueries";
import dynamic from "next/dynamic";
import { reducer, State } from "../Hooks/Reducers/ConfigReducer";
import { ConfigData, ConfigVars } from "../interfaces/MutationInterfaces";

const DynamicSnack = dynamic(
  () => import("../Components/Forms/Snackbars/ConfigSnack")
);
const DynamicConfig = dynamic(() => import("../Components/Forms/ConfigUser"));
const DynamicConfig2 = dynamic(() => import("../Components/Forms/ConfigUser2"));

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
  const [user, dispatch] = useReducer(reducer, initState);
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
          <DynamicConfig user={user} dispatch={dispatch} />
        ) : (
          <DynamicConfig2
            dispatch={dispatch}
            user={user}
            configUser={configUser}
          />
        )}
      </Paper>

      <DynamicSnack
        error={user.error}
        errMessage={user.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};

export default Configure;
