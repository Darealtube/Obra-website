import {
  List,
  Typography,
  Divider,
  Popover,
  Box,
  CircularProgress,
  IconButton,
  createStyles,
  withStyles,
  Badge,
  useMediaQuery,
  Theme,
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
import { READ_NOTIF } from "../../../apollo/apolloQueries";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

type Props = {
  user: AppbarUserData;
  fetchMore: any;
};

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 6,
      top: 6,
      border: `2px solid #3f51b5`,
      padding: "0 4px",
    },
  })
)(Badge);

const NotifPop = ({ user, fetchMore }: Props) => {
  const showNotif = useMediaQuery("(max-width:280px)");
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);
  const [read] = useMutation<ReadNotifData, ReadNotifVars>(READ_NOTIF);
  const { More } = usePagination(
    "userId",
    fetchMore,
    user.userId.notifications,
    4,
    "notifications"
  );
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

  useEffect(() => {
    setnotifCount(
      user.userId.notifications.totalUnreadCount + (user.userId.newUser ? 1 : 0)
    );
  }, [user.userId.notifications.totalUnreadCount]);

  return (
    <>
      <IconButton
        onClick={handleNotif}
        style={showNotif ? { display: "none" } : { display: "inline-flex" }}
      >
        <StyledBadge badgeContent={notifCount} color="secondary">
          <NotificationImportantIcon fontSize="large" htmlColor="white" />
        </StyledBadge>
      </IconButton>
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
              setNotifCount={setnotifCount}
            />
          </InfiniteScroll>
        </List>
      </Popover>
    </>
  );
};

export default NotifPop;
