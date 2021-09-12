import Link from "next/link";
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

const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  signOut({ callbackUrl: "https://obra-website.vercel.app/" });
};

const Menu = ({ name }: { name: string }) => {
  // handleSignOut will sign a user out of the page and remove their session.
  // This should be set as an absolute url, and we could set it as the official
  // url and it will work even in the development environment as this signOut
  // ultimately relies on the NEXTAUTH_URL environment variable.
  /*
    This link for signIn or signOut should be changed from http://localhost:3000/
    when in development mode, to https://obra-website.vercel.app/ when deploying to
    vercel (production).
  */
  return (
    <>
      <ListItem>
        <Link href={`/profile/${encodeURIComponent(name)}`} passHref>
          <Button component="a" className={styles.item}>
            <AccountCircleIcon className={styles.icon} /> Profile
          </Button>
        </Link>
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
        <Link href={`/settings/account`} passHref>
          <Button component="a" className={styles.item}>
            <SettingsApplicationsIcon className={styles.icon} /> Settings
          </Button>
        </Link>
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
    </>
  );
};

export default Menu;
