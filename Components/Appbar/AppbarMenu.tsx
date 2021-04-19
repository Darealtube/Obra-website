import {
  IconButton,
  Avatar,
  createStyles,
  Theme,
  Badge,
  withStyles,
  useMediaQuery,
} from "@material-ui/core";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { Palette } from "@material-ui/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { READ_NOTIF } from "../../apollo/apolloQueries";
import { Session } from "next-auth/client";
import { AppbarUserData } from "../../interfaces/QueryInterfaces";
import {
  ReadNotifData,
  ReadNotifVars,
} from "../../interfaces/MutationInterfaces";

const DynamicNotifPop = dynamic(() => import("./Popovers/NotifPop"));
const DynamicUserPop = dynamic(() => import("./Popovers/UserPopover"));

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

type Prop = {
  user: AppbarUserData; //will set later
  session: Session;
  loading: boolean;
};

const AppbarMenu = ({ user, session, loading }: Prop) => {
  const showNotif = useMediaQuery("(max-width:280px)");
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setnotifAnchor] = useState<null | HTMLElement>(null);
  const [notifCount, setnotifCount] = useState(0);
  const [read] = useMutation<ReadNotifData, ReadNotifVars>(READ_NOTIF, {
    variables: {
      userId: session?.id,
    },
  });

  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setprofAnchor(null);
  };

  const handleNotif = (event: React.MouseEvent<HTMLButtonElement>) => {
    setnotifAnchor(event.currentTarget);
    if (!user?.userId.notifRead) {
      read({
        variables: {
          userId: session?.id,
        },
      });
    }
    setnotifCount(0);
  };

  const handleNotifClose = () => {
    setnotifAnchor(null);
  };

  useEffect(() => {
    if (!loading && user && user.userId.notifRead) {
      setnotifCount(0);
    }

    if (!loading && user && !user.userId.notifRead) {
      setnotifCount(
        user.userId.notifications.length +
          (user.userId.newUser ? 1 : 0) +
          (user.userId.tutorial ? 1 : 0)
      );
    }
  }, [loading, user]);

  return (
    <div>
      <IconButton>
        <Link href={`/create`}>
          <Palette fontSize="large" htmlColor="white" />
        </Link>
      </IconButton>
      <IconButton
        onClick={handleNotif}
        style={showNotif ? { display: "none" } : { display: "inline-flex" }}
      >
        <StyledBadge badgeContent={notifCount} color="secondary">
          <NotificationImportantIcon fontSize="large" htmlColor="white" />
        </StyledBadge>
      </IconButton>
      <DynamicNotifPop
        notifAnchor={notifAnchor}
        handleNotifClose={handleNotifClose}
        user={user}
      />
      <IconButton onClick={handleProfile}>
        {user.userId.image ? (
          <Image
            src={user.userId.image}
            width={40}
            height={40}
            className={styles.avatar}
          />
        ) : (
          <Avatar src="" />
        )}
      </IconButton>
      <DynamicUserPop
        profAnchor={profAnchor}
        handleProfileClose={handleProfileClose}
        user={user}
      />
    </div>
  );
};

export default AppbarMenu;
