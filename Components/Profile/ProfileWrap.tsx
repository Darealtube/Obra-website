/* eslint-disable react/no-children-prop */
import React from "react";
import { Box } from "@material-ui/core";
import RightInfo from "./RightInfo";
import { UserInterface } from "../../interfaces/UserInterface";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";
import useGraphError from "../../Hooks/useGraphError";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const DynamicErrSnack = dynamic(() => import("../Forms/Snackbars/ConfigSnack"));

const ProfileWrap = ({ children, artist, admin, userLiked }: Props) => {
  const {
    err: { errMessage, error, errDisabled },
    handleError,
    closeError,
  } = useGraphError();

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
          errDisabled={errDisabled}
          handleError={handleError}
        />
        <RightInfo children={children} artist={artist} />
      </Box>
      <DynamicErrSnack
        error={error}
        errMessage={errMessage}
        handleErrorClose={closeError}
      />
    </div>
  );
};

export default ProfileWrap;
