import React from "react";
import { Box } from "@material-ui/core";
import RightInfo from "./RightInfo";
import { UserInterface } from "../../interfaces/UserInterface";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";
import { useSession } from "next-auth/client";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  userLiked: boolean;
};

const ProfileWrap = ({ children, artist, userLiked }: Props) => {
  const [session] = useSession();
  return (
    <div className={styles.wrapRoot}>
      <Box className={styles.backdrop}>
        <Image
          src={
            artist && artist.backdrop
              ? artist.backdrop
              : "/user-empty-backdrop.jpg"
          }
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box className={styles.information}>
        <UserInfo
          children={children}
          artist={artist}
          admin={artist.id == session?.id}
          userLiked={userLiked}
        />
        <RightInfo children={children} artist={artist} />
      </Box>
    </div>
  );
};

export default ProfileWrap;
