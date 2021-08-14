import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import {
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
} from "@material-ui/core";
import Link from "next/link";
import Head from "next/head";
import HomeIcon from "@material-ui/icons/Home";
import CommissionInfo from "../../../Components/Settings/Commission/CommissionInfo";

const CommSettings = () => {
  return <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Commission Settings</title>
    </Head>
    <SettingsWrap>
      <Box display="flex">
        <Link href={"/"} passHref>
          <IconButton component="a" size="large">
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h4" style={{ flexGrow: 1 }}>
          Commission Settings
        </Typography>
        <Link href={"/settings/commissionInfo/edit"} passHref>
          <Button component="a">Edit</Button>
        </Link>
      </Box>
      <Divider />
      <CommissionInfo />
    </SettingsWrap>
  </>;
};

export default CommSettings;
