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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TranslateIcon from "@material-ui/icons/Translate";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { signOut } from "next-auth/client";

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
  })
);

const Menu = ({ name }: { name: string }) => {
  const router = useRouter();
  const classes = useStyles();
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <div>
      <ListItem>
        <Button
          className={classes.item}
          onClick={() => router.push(`/profile/${name}`)}
        >
          <AccountCircleIcon className={classes.icon} /> Profile
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          {" "}
          <PeopleAltIcon className={classes.icon} /> Switch account
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item} onClick={handleSignOut}>
          <ExitToAppIcon className={classes.icon} /> Logout
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button className={classes.item}>
          <TranslateIcon className={classes.icon} /> Language
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <LanguageIcon className={classes.icon} /> Location
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <SettingsApplicationsIcon className={classes.icon} /> Settings
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
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

export default Menu;
