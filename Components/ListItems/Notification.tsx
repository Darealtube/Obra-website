import { ListItem, Typography, Avatar, IconButton, Box, ListItemAvatar } from "@material-ui/core";
import { notifedges } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Lists.module.css";
import Image from "next/image";
import { DELETE_NOTIF_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSession } from "next-auth/client";
import Link from "next/link";

type Props = {
  notifications: notifedges[];
  newUser: boolean;
  setNotifCount: any;
};

const Notification = ({ notifications, newUser, setNotifCount }: Props) => {
  const [session] = useSession();
  const [deleteNotif] = useMutation(DELETE_NOTIF_MUTATION);

  const DeleteNotif = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotif({
      variables: { notifId: e.currentTarget.id, userId: session?.id },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Notification:${e.currentTarget?.id}` });
        cache.gc();
      },
    });
    setNotifCount(0);
  };

  return (
    <div>
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
              Hey! It seems like you haven&apos;t completely configured your account.
              Please finish configuring your account in order for you to
              complete your information!
            </Typography>
          </div>
        </ListItem>
      )}
      {notifications && notifications.length > 0
        ? notifications.map((notif) => (
            <Link
              href={
                notif.node.commissionId
                  ? `/commissions/${notif.node.commissionId}`
                  : ``
              }
              key={notif.node.id}
              passHref
            >
              <ListItem
                key={notif.node.id}
                button
                component="a"
              >
                <ListItemAvatar>
                <Image
                  src={
                    notif.node.commissioner.image
                      ? notif.node.commissioner.image
                      : "/user-empty-avatar.png"
                  }
                  width={40}
                  height={40}
                  className={styles.avatar}
                  alt={"Commissioner Image"}
                />
                </ListItemAvatar>
                <Box display="flex" flexDirection="column" width="80%">
                  <Typography>{notif.node.date}</Typography>
                  <Typography className={styles.notifInfo}>
                    {notif.node.description}
                  </Typography>
                </Box>
                <IconButton id={notif.node.id} onClick={DeleteNotif}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Link>
          ))
        : ""}
    </div>
  );
};

export default Notification;
