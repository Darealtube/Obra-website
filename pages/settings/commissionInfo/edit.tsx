import React from "react";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import Head from "next/head";
import CommSettingsEditForm from "../../../Components/Settings/Commission/CommissionEditForm";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { editUserCommSettingUpdate } from "../../../utils/update";
import {
  EditUserCommData,
  EditUserCommVars,
} from "../../../interfaces/MutationInterfaces";
import { EDIT_COMMISSION_SETTINGS_MUTATION } from "../../../apollo/Mutations/userMutation";

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
      <CommSettingsEditForm editCommSettings={editCommSettings} />
    </>
  );
};

CommSettingsEdit.getWrap = function wrap(page) {
  return (
    <>
      <SettingsWrap>{page}</SettingsWrap>
    </>
  );
};

export default CommSettingsEdit;
