import { useQuery } from "@apollo/client";
import { Grid, Container, CircularProgress } from "@material-ui/core";
import { useSession } from "next-auth/client";
import React from "react";
import { SETTINGS_QUERY } from "../../apollo/apolloQueries";
import { SettingsData, SettingsVars } from "../../interfaces/QueryInterfaces";
import { UserInterface } from "../../interfaces/UserInterface";
import SettingList from "../ListItems/SettingList";

export const UserContext = React.createContext<UserInterface>(null);

const SettingsWrap = ({ children }) => {
  const [session] = useSession();
  const { data, loading } = useQuery<SettingsData, SettingsVars>(
    SETTINGS_QUERY,
    {
      variables: {
        id: session?.id,
      },
      skip: !session,
    }
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <SettingList />
      </Grid>
      {data && !loading ? (
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
    </Grid>
  );
};

export default SettingsWrap;
