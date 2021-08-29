import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import Head from "next/head";
import MainInfo from "../../../Components/Settings/Account/MainInfo";

const AccountSettings = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Account</title>
      </Head>
      <SettingsWrap pageTitle={"Account"}>
        <MainInfo />
      </SettingsWrap>
    </>
  );
};

export default AccountSettings;
