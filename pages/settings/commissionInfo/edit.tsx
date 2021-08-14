import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import {
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import Head from "next/head";
import HomeIcon from "@material-ui/icons/Home";
import CommSettingsEditForm from "../../../Components/Settings/Commission/CommissionEditForm";
import { useMutation } from "@apollo/client";
import { EDIT_COMMISSION_SETTINGS_MUTATION } from "../../../apollo/apolloQueries";
import { useSession } from "next-auth/client";
import { editUserCommSettingUpdate } from "../../../utils/update";
import {
  EditUserCommData,
  EditUserCommVars,
} from "../../../interfaces/MutationInterfaces";

const CommSettingsEdit = () => {
  const [session] = useSession();
  const [editCommSettings] = useMutation<EditUserCommData, EditUserCommVars>(
    EDIT_COMMISSION_SETTINGS_MUTATION,
    {
      update: (cache, mutationResult) =>
        editUserCommSettingUpdate(cache, mutationResult, session?.id),
    }
  );

  return <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Edit Commission Settings</title>
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
        <Link href={"/settings/commissionInfo/"} passHref>
          <Button component="a">Cancel</Button>
        </Link>
      </Box>
      <Divider />
      <CommSettingsEditForm editCommSettings={editCommSettings} />
    </SettingsWrap>
  </>;
};

export default CommSettingsEdit;
