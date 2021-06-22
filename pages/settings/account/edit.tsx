import SettingsWrap from "../../../Components/Settings/SettingsWrap";
import EditForm from "../../../Components/Settings/Account/EditAcc/EditForm";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import Link from "next/link";
import Head from "next/head";

const EditAccount = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Edit Account</title>
      </Head>
      <SettingsWrap>
        <Box display="flex">
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Account
          </Typography>
          <Link href="/settings/account/" passHref>
            <Button>Cancel</Button>
          </Link>
        </Box>
        <br />
        <Divider />
        <EditForm />
      </SettingsWrap>
    </>
  );
};

export default EditAccount;
