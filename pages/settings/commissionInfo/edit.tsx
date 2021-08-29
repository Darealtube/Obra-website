import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import Head from "next/head";
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

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit Commission Settings</title>
      </Head>
      <SettingsWrap pageTitle={"Edit Settings"}>
        <CommSettingsEditForm editCommSettings={editCommSettings} />
      </SettingsWrap>
    </>
  );
};

export default CommSettingsEdit;
