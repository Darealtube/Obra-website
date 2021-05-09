import { IconButton, Avatar } from "@material-ui/core";
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
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };
  const handleProfileClose = () => {
    setprofAnchor(null);
  };
  return (
    <div>
      <IconButton>
        <Link href={`/create`}>
          <Palette fontSize="large" htmlColor="white" />
        </Link>
      </IconButton>
      <DynamicNotifPop user={user} fetchMore={fetchMore} />
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
