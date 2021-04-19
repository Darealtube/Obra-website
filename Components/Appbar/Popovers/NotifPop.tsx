import { List, Typography, Divider, Popover, Box } from "@material-ui/core";
import Notification from "../../ListItems/Notification";
import styles from "../../../pages/styles/Specific/Appbar.module.css";
import { AppbarUserData } from "../../../interfaces/QueryInterfaces";

type Props = {
  notifAnchor: HTMLElement;
  handleNotifClose: () => void;
  user: AppbarUserData;
};

const NotifPop = ({ notifAnchor, handleNotifClose, user }: Props) => {
  return (
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
          notifications={user.userId ? user.userId.notifications : null}
        />
      </List>
    </Popover>
  );
};

export default NotifPop;
