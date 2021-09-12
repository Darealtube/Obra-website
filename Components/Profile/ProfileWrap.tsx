import React, { createContext } from "react";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import UserInfo from "./UserInfo";
import { useRouter } from "next/router";
import { useState } from "react";
import PanoramaIcon from "@material-ui/icons/Panorama";
import { useSession } from "next-auth/client";
import { USER_WRAP_QUERY } from "../../apollo/Queries/userQueries";
import { useQuery } from "@apollo/client";
import { UserData, UserWrapVars } from "../../interfaces/QueryInterfaces";

type Props = {
  children: React.ReactNode;
};

export const UserWrapContext = createContext<boolean>(null); // Contains galleryView toggle

const ProfileWrap = ({ children }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  const { data } = useQuery<UserData, UserWrapVars>(USER_WRAP_QUERY, {
    variables: {
      name: router.query.name as string,
      userId: session?.id,
    },
  });
  const [galleryView, setGalleryView] = useState(false);
  const toggleGallery = () => {
    setGalleryView(!galleryView);
  };
  const [tabsValue, setTabsValue] = useState(router.asPath);
  const handleTabChange = (_event, newValue: string) => {
    setTabsValue(newValue);
    router.push(newValue);
  };

  return (
    <>
      {!galleryView && (
        <Box className={styles.backdrop}>
          <Image
            src={
              data?.userName && data?.userName.backdrop
                ? data?.userName.backdrop
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
            {data?.userName && (
              <UserInfo
                artist={data?.userName}
                userLiked={data?.userName.isLikedBy}
              />
            )}
          </Grid>
        )}
        <Grid item xs={12} md={galleryView ? 12 : 8}>
          <Button
            onClick={toggleGallery}
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
              <Tab
                label="Posts"
                value={`/profile/${encodeURIComponent(
                  router.query.name as string
                )}`}
              />
              <Tab
                label="Liked Posts"
                value={`/profile/${encodeURIComponent(
                  router.query.name as string
                )}/liked`}
              />
            </Tabs>
            <br />
          </Box>
          <UserWrapContext.Provider value={galleryView}>
            {children}
          </UserWrapContext.Provider>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileWrap;
