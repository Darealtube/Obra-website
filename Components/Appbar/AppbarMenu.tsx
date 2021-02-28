import {
  List,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Popover,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Badge,
  withStyles,
} from "@material-ui/core";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { Palette } from "@material-ui/icons";
import Link from "next/link";
import Image from "next/image";
import Menu from "../ListItems/Menu";
import Notification from "../ListItems/Notification";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      height: "100%",
      overflow: "auto",
      width: "20em",
    },
    box: {
      margin: theme.spacing(2.5, 2),
    },
    notifmenu: {
      height: "100%",
      overflow: "auto",
      width: "100%",
      maxWidth: 568,
      maxHeight: 420,
    },
    avatar: {
      borderRadius: "50%",
    },
  })
);

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
  const classes = useStyles();
  return (
    <div>
      <IconButton>
        <Link href={`/create`}>
          <Palette fontSize="large" htmlColor="white" />
        </Link>
      </IconButton>
      <IconButton onClick={handleNotif}>
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
        <Box className={classes.box}>
          <Typography>Notifications</Typography>
        </Box>
        <Divider />
        <List className={classes.notifmenu}>
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
            className={classes.avatar}
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
        <Box display="flex" flexWrap="wrap" className={classes.box}>
          {user.userId.image ? (
            <Image
              src={user.userId.image}
              width={40}
              height={35}
              className={classes.avatar}
            />
          ) : (
            <Avatar src="" />
          )}
          <div style={{ marginLeft: "25px" }}>
            {user.userId.username || user.userId.name ? (
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
        <List className={classes.menu}>
          <Menu name={user.userId.name} />
        </List>
      </Popover>
    </div>
  );
};

export default AppbarMenu;
