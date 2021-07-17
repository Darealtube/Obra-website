import { ListItem, Divider, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { signIn } from "next-auth/client";
import styles from "../../pages/styles/Specific/Lists.module.css";

const NoUserMenu = () => {
  // handleSignIn signs a user into the website and creates a session
  // that will presist throughout the page, unless they log out. The
  // Callback URL should always be set to the home page.
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn(null, {
      callbackUrl: `https://obra-website.vercel.app/home`,
    });
  };
  return (
    <div>
      <ListItem>
        <Button className={styles.item} onClick={handleSignIn}>
          <MeetingRoomIcon className={styles.icon} /> Login
        </Button>
      </ListItem>
      <Divider />
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

export default NoUserMenu;
