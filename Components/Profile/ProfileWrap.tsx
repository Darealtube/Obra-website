import React from "react";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { UserInterface } from "../../interfaces/UserInterface";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";
import router from "next/router";
import { useState } from "react";
import PanoramaIcon from "@material-ui/icons/Panorama";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  userLiked: boolean;
  galleryView: boolean;
  handleGallery: () => void;
  currentPage: string;
};

const ProfileWrap = ({
  children,
  artist,
  userLiked,
  galleryView,
  handleGallery,
  currentPage,
}: Props) => {
  const [tabsValue, setTabsValue] = useState(currentPage);
  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
    router.push(newValue);
  };

  return (
    <>
      {!galleryView && (
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
      )}
      <Grid container spacing={2}>
        {!galleryView && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{ position: "relative", bottom: "80px" }}
          >
            {artist && <UserInfo artist={artist} userLiked={userLiked} />}
          </Grid>
        )}
        <Grid item xs={12} md={galleryView ? 12 : 8}>
          <Button
            onClick={handleGallery}
            startIcon={<PanoramaIcon />}
            sx={{ marginTop: "16px" }}
          >
            <Typography align="center">
              {!galleryView ? "Gallery View" : "Exit Gallery View"}
            </Typography>
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={4}
          >
            <Tabs value={tabsValue} onChange={handleTabChange}>
              <Tab label="Posts" value={`/profile/${artist.name}/`} />
              <Tab
                label="Liked Posts"
                value={`/profile/${artist.name}/liked`}
              />
            </Tabs>
            <br />
          </Box>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileWrap;
