import {
  ListItem,
  Typography,
  Avatar,
  IconButton,
  Box,
  ListItemAvatar,
} from "@material-ui/core";
import { notifedges } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Lists.module.css";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useMutation } from "@apollo/client";
import { DELETE_NOTIF_MUTATION } from "../../apollo/apolloQueries";

type Props = {
  notifications: notifedges[];
  newUser: boolean;
  deleteDisabled: boolean;
  resetNotif: () => void;
};

const Notification = ({
  notifications,
  newUser,
  deleteDisabled,
  resetNotif,
}: Props) => {
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
    resetNotif();
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
              Hey! It seems like you haven&apos;t completely configured your
              account. Please finish configuring your account in order for you
              to complete your information!
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
              <ListItem key={notif.node.id} button component="a">
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
                <IconButton
                  id={notif.node.id}
                  onClick={DeleteNotif}
                  disabled={deleteDisabled}
                  size="large">
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
