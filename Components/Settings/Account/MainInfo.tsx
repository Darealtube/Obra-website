import { Typography, Grid, Box, Divider } from "@material-ui/core";
import Image from "next/image";
import { useContext } from "react";
import styles from "../../../pages/styles/General/Settings.module.css";
import { UserContext } from "../SettingsWrap";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import CakeIcon from "@material-ui/icons/Cake";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import CallIcon from "@material-ui/icons/Call";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

const MainInfo = () => {
  const theme = useTheme();
  const user = useContext(UserContext);
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <Box className={styles.backdrop}>
        <Image
          src={user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg"}
          layout="fill"
          objectFit="cover"
          alt={"Backdrop Image"}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ position: "relative", bottom: "40px" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={user.image ? user.image : "/user-empty-avatar.png"}
              width={120}
              height={120}
              className={styles.avatar}
              alt={"User Image"}
            />
          </Box>

          <Typography variant="h3" align="center">
            {user.name ? user.name : "No name"}
          </Typography>
          <Divider />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ border: "0.5px ridge", marginTop: "8px" }}
        >
          <Typography variant="body1" paragraph>
            {user.userBio ? user.userBio : "No Bio"}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={8} className={styles.userInfo}>
          <Grid container spacing={lg ? 2 : 0}>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <EmailIcon />
                <Typography variant="h6" className={styles.text}>
                  {user.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <PersonIcon />
                <Typography variant="h6" className={styles.text}>
                  {user.age} years old
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <CakeIcon />
                <Typography variant="h6" className={styles.text}>
                  Birthday on {user.birthday}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <PublicIcon />
                <Typography variant="h6" className={styles.text}>
                  Lives in {user.country}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <WorkIcon />
                <Typography variant="h6" className={styles.text}>
                  Is a {user.artLevel}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" alignItems="center">
                <CallIcon />
                <Typography variant="h6" className={styles.text}>
                  {user.phone}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainInfo;
