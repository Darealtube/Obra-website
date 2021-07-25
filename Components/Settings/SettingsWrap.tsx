import { useQuery } from "@apollo/client";
import { Grid, Container, CircularProgress } from "@material-ui/core";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect, useState } from "react";
import { SETTINGS_QUERY } from "../../apollo/apolloQueries";
import { QueryIdVars, SettingsData } from "../../interfaces/QueryInterfaces";
import { UserInterface } from "../../interfaces/UserInterface";
import SettingList from "../ListItems/SettingList";

export const UserContext = React.createContext<UserInterface>(null);
const DynamicNoSessDialog = dynamic(
  () => import("../../Components/MainPopovers/NoSessionDialog")
);


const SettingsWrap = ({ children }: { children: ReactNode }) => {
  const [session, sessload] = useSession();
  const [noSess, setnoSess] = useState(false);
  const { data, loading } = useQuery<SettingsData, QueryIdVars>(
    SETTINGS_QUERY,
    {
      variables: { 
        id: session?.id,
      },
      skip: !session,
    }
  );

  useEffect(() => {
    if (!session && !sessload) {
      setnoSess(true);
    }
  }, [session, sessload]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
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
            <Container>{children}</Container>
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
