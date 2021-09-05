import React from "react";
import SettingsWrap, { UserContext } from "../../../Components/Settings/SettingsWrap";
import Head from "next/head";
import CommissionInfo from "../../../Components/Settings/Commission/CommissionInfo";
import { useContext } from "react";

const CommSettings = () => {
  const user = useContext(UserContext)
  console.log(user)
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission Settings</title>
      </Head>
      <CommissionInfo />
    </>
  );
};

export default CommSettings;
