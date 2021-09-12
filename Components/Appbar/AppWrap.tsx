import { styled, Typography, useMediaQuery, Box, Fab } from "@material-ui/core";
import { createContext, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { APPBAR_USER_QUERY } from "../../apollo/Queries/userQueries";
import { AppbarUserData, QueryIdVars } from "../../interfaces/QueryInterfaces";
import Image from "next/image";
import Appbar from "./Appbar";
import AppDrawer from "./AppDrawer";

export const AppContext = createContext<boolean>(null);
const drawerWidth = "24vw";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}`,
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  maxWidth: "100%",
  marginTop: "24px",
}));

const AppWrap = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [session] = useSession();
  const mobile = useMediaQuery(`(max-width: 900px)`);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const { data: user, fetchMore: moreNotif } = useQuery<
    AppbarUserData,
    QueryIdVars
  >(APPBAR_USER_QUERY, {
    variables: {
      id: session?.id,
      limit: 4,
    },
    skip: !session,
  });

  return (
    <>
      {!mobile ? (
        <>
          <AppDrawer
            user={user}
            moreNotif={moreNotif}
            handleDrawer={handleDrawer}
            drawerOpen={open}
          />

          <Fab
            color="primary"
            onClick={handleDrawer}
            variant="extended"
            sx={{ position: "fixed", top: 8, left: 8, zIndex: 1 }}
          >
            <MenuIcon />
            <Image
              src="/obra-logo.png"
              height={40}
              width={40}
              alt={"Obra Logo"}
            />
            <Typography variant="h6" noWrap>
              Obra
            </Typography>
          </Fab>

          <AppContext.Provider value={mobile ? false : open}>
            <Main open={open}>{children}</Main>
          </AppContext.Provider>
        </>
      ) : (
        <>
          <Appbar user={user} moreNotif={moreNotif} />
          <AppContext.Provider value={mobile ? false : open}>
            <Box marginTop="80px">{children}</Box>
          </AppContext.Provider>
        </>
      )}
    </>
  );
};

export default AppWrap;
