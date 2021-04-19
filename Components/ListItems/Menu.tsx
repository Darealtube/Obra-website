import { useRouter } from "next/router";
import { ListItem, Divider, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TranslateIcon from "@material-ui/icons/Translate";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { signOut } from "next-auth/client";
import styles from "../../pages/styles/Specific/Lists.module.css";

const Menu = ({ name }: { name: string }) => {
  const router = useRouter();
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <div>
      <ListItem>
        <Button
          className={styles.item}
          onClick={() => router.push(`/profile/${name}`)}
        >
          <AccountCircleIcon className={styles.icon} /> Profile
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item}>
          {" "}
          <PeopleAltIcon className={styles.icon} /> Switch account
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item} onClick={handleSignOut}>
          <ExitToAppIcon className={styles.icon} /> Logout
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button className={styles.item}>
          <TranslateIcon className={styles.icon} /> Language
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item}>
          <LanguageIcon className={styles.icon} /> Location
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item}>
          <SettingsApplicationsIcon className={styles.icon} /> Settings
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item}>
          <InfoIcon className={styles.icon} /> Help
        </Button>
      </ListItem>
      <ListItem>
        <Button className={styles.item}>
          <ContactSupportIcon className={styles.icon} /> Send Feedback
        </Button>
      </ListItem>
    </div>
  );
};

export default Menu;
