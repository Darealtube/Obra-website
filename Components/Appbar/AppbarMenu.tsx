import {
  List,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Popover,
  Box,
  createStyles,
  Theme,
  Badge,
  withStyles,
  useMediaQuery,
} from "@material-ui/core";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { Palette } from "@material-ui/icons";
import Link from "next/link";
import Image from "next/image";
import Menu from "../ListItems/Menu";
import Notification from "../ListItems/Notification";
import styles from "../../pages/styles/Specific/Appbar.module.css";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 6,
      top: 6,
      border: `2px solid #3f51b5`,
      padding: "0 4px",
    },
  })
)(Badge);

interface Prop {
  user: any; //will set later
  handleNotif: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNotifClose: () => void;
  handleProfile: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleProfileClose: () => void;
  profAnchor: null | HTMLElement;
  notifAnchor: null | HTMLElement;
  notifCount: number;
}

const AppbarMenu = ({
  user,
  handleNotif,
  notifAnchor,
  handleNotifClose,
  handleProfile,
  handleProfileClose,
  profAnchor,
  notifCount,
}: Prop) => {
  const showNotif = useMediaQuery("(max-width:280px)");

  return (
    <div>
      <IconButton>
        <Link href={`/create`}>
          <Palette fontSize="large" htmlColor="white" />
        </Link>
      </IconButton>
      <IconButton
        onClick={handleNotif}
        style={showNotif ? { display: "none" } : { display: "inline-flex" }}
      >
        <StyledBadge badgeContent={notifCount} color="secondary">
          <NotificationImportantIcon fontSize="large" htmlColor="white" />
        </StyledBadge>
      </IconButton>
      <Popover
        anchorEl={notifAnchor}
        keepMounted
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className={styles.box}>
          <Typography>Notifications</Typography>
        </Box>
        <Divider />
        <List className={styles.notifmenu}>
          <Notification
            newUser={user.userId.newUser}
            tutorial={user.userId.tutorial}
            notifications={user.userId ? user.userId.notifications : null}
          />
        </List>
      </Popover>
      <IconButton onClick={handleProfile}>
        {user.userId.image ? (
          <Image
            src={user.userId.image}
            width={40}
            height={40}
            className={styles.avatar}
          />
        ) : (
          <Avatar src="" />
        )}
      </IconButton>
      <Popover
        id="simple-menu"
        anchorEl={profAnchor}
        keepMounted
        open={Boolean(profAnchor)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box display="flex" flexWrap="wrap" className={styles.box}>
          {user.userId.image ? (
            <Image
              src={user.userId.image}
              width={45}
              height={45}
              className={styles.avatar}
            />
          ) : (
            <Avatar src="" />
          )}
          <div style={{ marginLeft: "25px" }}>
            {user.userId.name ? (
              <Typography>{user.userId.name}</Typography>
            ) : (
              <Typography>No Name</Typography>
            )}
            {user.userId.email ? (
              <Typography>{user.userId.email}</Typography>
            ) : (
              <Typography>No Email found</Typography>
            )}
          </div>
        </Box>
        <Divider />
        <List className={styles.menu}>
          <Menu name={user.userId.name} />
        </List>
      </Popover>
    </div>
  );
};

export default AppbarMenu;
