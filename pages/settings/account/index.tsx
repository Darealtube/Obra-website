import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import { Typography, Grid, Divider, Button, Box } from "@material-ui/core";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PrimaryInfo from "../../../Components/Settings/Account/PrimaryInfo";
import Link from "next/link";
import Head from "next/head";

const DynamicMoreInfo = dynamic(
  () => import("../../../Components/Settings/Account/SecondaryInfo")
);

const AccountSettings = () => {
  const [moreInfo, setMoreInfo] = useState(false);
  const handleMore = () => {
    setMoreInfo((prevmoreInfo) => !prevmoreInfo);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Account</title>
      </Head>
      <SettingsWrap>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="h4" style={{ flexGrow: 1 }}>
                Account
              </Typography>
              <Link href={"/settings/account/edit"}>
                <Button component="a">Edit</Button>
              </Link>
            </Box>
            <br />
            <Divider />
          </Grid>
          <PrimaryInfo />
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleMore}
              endIcon={!moreInfo ? <ExpandMore /> : <ExpandLess />}
            >
              More Information
            </Button>
            <Divider />
          </Grid>
          <DynamicMoreInfo open={moreInfo} />
        </Grid>
      </SettingsWrap>
    </>
  );
};

export default AccountSettings;
