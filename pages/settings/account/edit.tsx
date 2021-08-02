import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import EditForm from "../../../Components/Settings/Account/EditAcc/EditForm";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useMutation, DataProxy } from "@apollo/client";
import { EDIT_USER_MUTATION } from "../../../apollo/apolloQueries";
import { EditUserData } from "../../../interfaces/MutationInterfaces";
import { editUserUpdate } from "../../../utils/update";

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
      <SettingsWrap>
        <Box display="flex" marginBottom={4}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Account
          </Typography>
          <Link href="/settings/account/" passHref>
            <Button>Cancel</Button>
          </Link>
        </Box>
        <br />
        <Divider />
        <EditForm editUser={editUser} />
      </SettingsWrap>
    </>
  );
};

export default EditAccount;
