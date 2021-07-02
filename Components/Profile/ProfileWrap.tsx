/* eslint-disable react/no-children-prop */
import React from "react";
import { Box } from "@material-ui/core";
import RightInfo from "./RightInfo";
import { UserInterface } from "../../interfaces/UserInterface";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const DynamicErrSnack = dynamic(() => import("../Forms/Snackbars/ConfigSnack"));

const ProfileWrap = ({ children, artist, admin, userLiked }: Props) => {
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
          alt={"Backdrop Image"}
        />
      </Box>
      <Box className={styles.information}>
        <UserInfo
          children={children}
          artist={artist}
          admin={admin}
          userLiked={userLiked}
        />
        <RightInfo children={children} artist={artist} />
      </Box>
    </div>
  );
};

export default ProfileWrap;
