import { ListItem, Typography, Avatar } from "@material-ui/core";
import { NotifInterface } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Lists.module.css";

type Props = {
  notifications: NotifInterface[];
  newUser: Boolean;
};

const Notification = ({ notifications, newUser }: Props) => {
  return (
    <div>
      {notifications && notifications.length > 0
        ? notifications.map((notif) => (
            <ListItem className={styles.notifitem} key={notif.postId}>
              <Avatar className={styles.icon}>{notif.user.image}</Avatar>
              <div>
                <Typography>{notif.date}</Typography>
                <Typography className={styles.notifInfo}>
                  {notif.description}
                </Typography>
              </div>
            </ListItem>
          ))
        : ""}
      <ListItem className={styles.notifitem}>
        <Avatar className={styles.icon}>O</Avatar>
        <div>
          <Typography>Obra Tutorial</Typography>
          <Typography className={styles.notifInfo}>
            Hey! Welcome to Obra, where we ... . Let us show you how to do
            things around here!
          </Typography>
        </div>
      </ListItem>
      {newUser && (
        <ListItem className={styles.notifitem}>
          <Avatar className={styles.icon}>O</Avatar>
          <div>
            <Typography>Obra </Typography>
            <Typography className={styles.notifInfo}>
              Hey! It seems like you haven't completely configured your account.
              Please finish configuring your account in order for you to
              complete your information!
            </Typography>
          </div>
        </ListItem>
      )}
    </div>
  );
};

export default Notification;
