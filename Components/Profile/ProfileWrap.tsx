import React from "react";
import { Box, Grid } from "@material-ui/core";
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ position: "relative", bottom: "80px" }}>
          <UserInfo artist={artist} admin={admin} userLiked={userLiked} />
        </Grid>
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileWrap;
