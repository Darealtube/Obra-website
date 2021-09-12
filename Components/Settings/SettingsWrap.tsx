import { useQuery } from "@apollo/client";
import {
  Grid,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryIdVars, SettingsData } from "../../interfaces/QueryInterfaces";
import { UserInterface } from "../../interfaces/UserInterface";
import SettingList from "../ListItems/SettingList";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import { useRouter } from "next/router";
import { SETTINGS_QUERY } from "../../apollo/Queries/userQueries";

export const UserContext = React.createContext<UserInterface>(null); // Contains User Settings Information
const DynamicNoSessDialog = dynamic(
  () => import("../../Components/MainPopovers/NoSessionDialog")
);

const SettingsWrap = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery<SettingsData, QueryIdVars>(
    SETTINGS_QUERY,
    {
      variables: {
        id: session?.id,
      },
      skip: !session,
    }
  );

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

  return (
    <Grid container spacing={2}>
      {xs && (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={handleDrawer}
          onOpen={handleDrawer}
        >
          <SettingList />
        </SwipeableDrawer>
      )}
      <Grid item xs={false} sm={4} display={{ xs: "none", sm: "block" }}>
        <SettingList />
      </Grid>

      {!noSess && data && !loading ? (
        <UserContext.Provider value={data.userId}>
          <Grid
            item
            xs={12}
            sm={8}
            style={{ height: "100vh", overflow: "auto" }}
          >
            <Box display="flex" alignItems="center">
              <Link href={"/"} passHref>
                <IconButton component="a" size="large">
                  <HomeIcon />
                </IconButton>
              </Link>
              <Typography variant="h4">Settings</Typography>
            </Box>

            <Container>
              <Box display="flex">
                <Box flexGrow={1}>
                  {xs && (
                    <IconButton onClick={handleDrawer} size="large">
                      <MenuIcon />
                    </IconButton>
                  )}
                </Box>
                {router.pathname.endsWith("edit") ? (
                  <Link
                    href={`${router.pathname.replace("edit", "")}`}
                    passHref
                  >
                    <Button component="a" variant="outlined">
                      Cancel
                    </Button>
                  </Link>
                ) : (
                  <Link href={`${router.pathname}/edit`} passHref>
                    <Button component="a" variant="outlined">
                      Edit
                    </Button>
                  </Link>
                )}
              </Box>
              <br />
              <Divider />
              {children}
            </Container>
          </Grid>
        </UserContext.Provider>
      ) : (
        <Grid
          item
          xs={12}
          sm={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Grid>
      )}
      <DynamicNoSessDialog open={noSess} />
    </Grid>
  );
};

export default SettingsWrap;
