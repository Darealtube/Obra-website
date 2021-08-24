import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  SwipeableDrawer,
  Drawer,
  List,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { useSession } from "next-auth/client";
import { APPBAR_USER_QUERY } from "../../apollo/apolloQueries";
import { useQuery } from "@apollo/client";
import AppbarMenu from "./AppbarMenu";
import AppbarNoUser from "./AppbarNoUser";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import { AppbarUserData, QueryIdVars } from "../../interfaces/QueryInterfaces";
import Image from "next/image";
import DrawerItems from "../ListItems/Drawer";

const Appbar = () => {
  const [session, loading] = useSession();
  const { data: user, fetchMore } = useQuery<AppbarUserData, QueryIdVars>(
    APPBAR_USER_QUERY,
    {
      variables: {
        id: session?.id,
        limit: 4,
      },
      skip: !session,
      pollInterval: 60000,
    }
  );
  const [open, setOpen] = useState(false);
  const swipeable = useMediaQuery(`(max-width: 480px)`);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* App Bar */}
      <AppBar sx={{ backgroundColor: "#2a9d8f" }}>
        <Toolbar>
          {/* Drawer and Logo */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={styles.menuButton}
            onClick={handleDrawer}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/obra-logo.png"
            height={40}
            width={40}
            alt={"Obra Logo"}
          />
          <Typography
            variant="h6"
            noWrap
            className={styles.toolbarTitle}
            style={{ marginLeft: "8px" }}
          >
            Obra
          </Typography>
          {/* Drawer and Logo */}
          {session && !loading && user ? (
            <AppbarMenu user={user} fetchMore={fetchMore} />
          ) : !session && !loading ? (
            <AppbarNoUser />
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      {/* App Bar */}

      {/* Drawer */}
      {swipeable ? (
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={handleDrawer}
          onOpen={handleDrawer}
        >
          <List className={styles.list}>
            <DrawerItems userName={user?.userId.name} /> {/* Drawer List */}
          </List>
        </SwipeableDrawer>
      ) : (
        <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
          <List className={styles.list}>
            <DrawerItems userName={user?.userId.name} /> {/* Drawer List */}
          </List>
        </Drawer>
      )}
      {/* Drawer */}
    </div>
  );
};

export default Appbar;
