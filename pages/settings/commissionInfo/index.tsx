import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import Head from "next/head";
import CommissionInfo from "../../../Components/Settings/Commission/CommissionInfo";

const CommSettings = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission Settings</title>
      </Head>
      <SettingsWrap pageTitle={"Commission Settings"}>
        <CommissionInfo />
      </SettingsWrap>
    </>
  );
};

export default CommSettings;
