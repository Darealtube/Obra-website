import {
  List,
  Typography,
  Divider,
  Popover,
  Box,
  CircularProgress,
  Badge,
  ListItemIcon,
  ListItem,
  Button,
} from "@material-ui/core";
import Notification from "../../ListItems/Notification";
import styles from "../../../pages/styles/Specific/Appbar.module.css";
import { AppbarUserData } from "../../../interfaces/QueryInterfaces";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ReadNotifData,
  ReadNotifVars,
} from "../../../interfaces/MutationInterfaces";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { READ_NOTIF } from "../../../apollo/Mutations/notifMutations";

type Props = {
  user: AppbarUserData;
  fetchMore: any;
};

const NotifPop = ({ user, fetchMore }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);
  const [read] = useMutation<ReadNotifData, ReadNotifVars>(READ_NOTIF);
  const { More, refetching } = usePagination({
    key: "userId",
    fetchMore: fetchMore,
    info: user.userId.notifications,
    limit: 4,
    key2: "notifications",
  });
  const [notifCount, setnotifCount] = useState(
    user?.userId.notifications.totalUnreadCount + (user.userId.newUser ? 1 : 0)
  );

  // handleNotif will reset the unread notification count and it triggers once
  // the user clicks the notification button. It also performs a "read notif" on those
  // notifications.
  const handleNotif = (event: React.MouseEvent<HTMLButtonElement>) => {
    setnotifAnchor(event.currentTarget);
    if (notifCount > 0) {
      read({
        variables: {
          notifArray: user.userId.notifications.idList,
        },
      });
    }
    setnotifCount(0);
  };

  const handleNotifClose = () => {
    setnotifAnchor(null);
  };

  const handleResetNotif = () => {
    setnotifCount(0);
  };

  useEffect(() => {
    if (refetching) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [refetching]);

  return (
    <>
      <ListItem
        sx={{ color: "inherit" }}
        component={Button}
        onClick={handleNotif}
      >
        <ListItemIcon>
          <NotificationImportantIcon />
        </ListItemIcon>
        <Badge badgeContent={notifCount} color="secondary">
          <Typography variant="body1">Notifications</Typography>
        </Badge>
      </ListItem>
      <Popover
        anchorEl={notifAnchor}
        keepMounted
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
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
        <List className={styles.notifmenu} id="notifList">
          <InfiniteScroll
            dataLength={user.userId.notifications.edges.length}
            next={More}
            hasMore={user.userId.notifications.pageInfo.hasNextPage}
            loader={
              <>
                <br />
                <CircularProgress />
              </>
            }
            style={{
              overflow: "hidden",
              textAlign: "center",
            }}
            scrollableTarget="notifList"
            scrollThreshold={0.9}
          >
            <Notification
              newUser={user.userId.newUser}
              notifications={
                user.userId ? user.userId.notifications.edges : null
              }
              deleteDisabled={disabled}
              resetNotif={handleResetNotif}
            />
          </InfiniteScroll>
        </List>
      </Popover>
    </>
  );
};

export default NotifPop;
