import EditForm from "../../../Components/Settings/Account/EditAcc/EditForm";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useMutation, DataProxy } from "@apollo/client";
import { EditUserData } from "../../../interfaces/MutationInterfaces";
import { editUserUpdate } from "../../../utils/update";
import { EDIT_USER_MUTATION } from "../../../apollo/Mutations/userMutation";
import SettingsWrap from "../../../Components/Settings/SettingsWrap";

const EditAccount = () => {
  const [session] = useSession();
  const [editUser] = useMutation<EditUserData>(EDIT_USER_MUTATION, {
    update: (cache: DataProxy, mutationResult) =>
      editUserUpdate(cache, mutationResult, session?.id),
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit Account</title>
      </Head>
      <EditForm editUser={editUser} />
    </>
  );
};

EditAccount.getWrap = function wrap(page) {
  return (
    <>
      <SettingsWrap>{page}</SettingsWrap>
    </>
  );
};

export default EditAccount;
