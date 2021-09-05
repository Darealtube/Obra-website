import { IconButton, Avatar, useMediaQuery } from "@material-ui/core";
import { Palette } from "@material-ui/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Appbar.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AppbarUserData } from "../../interfaces/QueryInterfaces";

const DynamicNotifPop = dynamic(() => import("./Popovers/NotifPop"));
const DynamicUserPop = dynamic(() => import("./Popovers/UserPopover"));

type Prop = {
  user: AppbarUserData;
  fetchMore: any;
};

const AppbarMenu = ({ user, fetchMore }: Prop) => {
  const XSmall = useMediaQuery("(max-width: 402px)");
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };
  const handleProfileClose = () => {
    setprofAnchor(null);
  };
  return (
    <div>
      <IconButton size="large">
        <Link href={`/create`} passHref>
          <Palette fontSize="large" htmlColor="black" />
        </Link>
      </IconButton>
      {!XSmall && <DynamicNotifPop user={user} fetchMore={fetchMore} />}
      <IconButton onClick={handleProfile} size="large">
        {user.userId.image ? (
          <Image
            src={user.userId.image}
            width={40}
            height={40}
            className={styles.avatar}
            alt={"User Image"}
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
