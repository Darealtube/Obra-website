import { useRouter } from "next/router";
import {
  ListItem,
  Divider,
  Button,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { signIn, signOut } from "next-auth/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
    item: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
    },
    notifitem: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    notifInfo: {
      flexDirection: "column",
      marginRight: theme.spacing(10),
    },
  })
);

const NoUserMenu = () => {
  const classes = useStyles();
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "http://localhost:3000/" });
  };
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn(null, { callbackUrl: "http://localhost:3000/home" });
  };
  return (
    <div>
      <ListItem>
        <Button className={classes.item} onClick={handleSignIn}>
          <MeetingRoomIcon className={classes.icon} /> Login
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button className={classes.item} onClick={handleSignOut}>
          <InfoIcon className={classes.icon} /> Help
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <ContactSupportIcon className={classes.icon} /> Send Feedback
        </Button>
      </ListItem>
    </div>
  );
};

export default NoUserMenu;
