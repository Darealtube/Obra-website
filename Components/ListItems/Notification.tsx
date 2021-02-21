import { useRouter } from "next/router";
import {
  ListItem,
  Typography,
  Theme,
  makeStyles,
  createStyles,
  Avatar,
} from "@material-ui/core";
import { NotifInterface } from "../../interfaces/UserInterface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
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

const Notification = ({ notifications }: {notifications: NotifInterface[]}) => {
    const classes = useStyles();
    return (
      <div>
        {notifications && notifications.length > 0
          ? notifications.map((notif) => (
              <ListItem className={classes.notifitem} key={notif.postId}>
                <Avatar className={classes.icon}>{notif.user.image}</Avatar>
                <div>
                  <Typography>{notif.date}</Typography>
                  <Typography className={classes.notifInfo}>
                    {notif.description}
                  </Typography>
                </div>
              </ListItem>
            ))
          : ""}
      </div>
    );
  };

export default Notification;