import { Typography, Grid, Divider } from "@material-ui/core";
import Image from "next/image";
import { useContext } from "react";
import styles from "../../../pages/styles/General/Settings.module.css";
import { UserContext } from "../SettingsWrap";

const PrimaryInfo = () => {
  const user = useContext(UserContext);
  return (
    <>
      <Grid item xs={12} className={styles.backdrop}>
        <Image
          src={user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg"}
          layout="fill"
          objectFit="contain"
          alt={"User Backdrop"}
        />
      </Grid>

      <Grid item xs={6} sm={2} className={styles.dp}>
        <Image
          src={user.image ? user.image : "/user-empty-avatar.png"}
          layout="fill"
          objectFit="contain"
          className={styles.avatar}
          alt={"User Image"}
        />
      </Grid>
      <Grid item xs={6} sm={10}></Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Username</Typography>
        <Typography variant="body1">
          {user.name ? user.name : "No name"}
        </Typography>
        <br />
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Bio</Typography>
        <Typography variant="body1">
          {user.userBio ? user.userBio : "No Bio"}
        </Typography>
        <br />
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Is a </Typography>
        <Typography variant="body1">
          {user.artLevel ? user.artLevel : "Unknown"}
        </Typography>
        <br />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Likes to do</Typography>
        <Typography variant="body1">
          {user.artKinds ? user.artKinds.join(", ").toString() : "Unknown"}
        </Typography>
        <br />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Likes to do it in</Typography>
        <Typography variant="body1">
          {user.artStyles ? user.artStyles.join(", ").toString() : "Unknown"}
        </Typography>
        <br />
        <Divider />
      </Grid>
    </>
  );
};

export default PrimaryInfo;
