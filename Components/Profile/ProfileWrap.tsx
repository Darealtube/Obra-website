import { useQuery } from "@apollo/client";
import React from "react";
import { Grid, Container, List, ListItem, Box } from "@material-ui/core";
import RightInfo from "./RightInfo";
import { UserInterface } from "../../interfaces/UserInterface";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const ProfileWrap = ({ children, artist, admin, userLiked }: Props) => {
  return (
    <div className={styles.wrapRoot}>
      <Box className={styles.backdrop}>
        <Image src={artist.image} layout="fill" objectFit="cover" />
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
