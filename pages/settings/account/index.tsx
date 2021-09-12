import React from "react";
import Head from "next/head";
import MainInfo from "../../../Components/Settings/Account/MainInfo";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";

const AccountSettings = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Account</title>
      </Head>
      <MainInfo />
    </>
  );
};

AccountSettings.getWrap = function wrap(page) {
  return (
    <>
      <SettingsWrap>{page}</SettingsWrap>
    </>
  );
};

export default AccountSettings;
