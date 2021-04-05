import { Button, Box, Paper, Typography, Container } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import { UserInterface } from "../../interfaces/UserInterface";
import CakeIcon from "@material-ui/icons/Cake";
import FlagIcon from "@material-ui/icons/Flag";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BrushIcon from "@material-ui/icons/Brush";
import {
  LIKE_ARTIST_MUTATION,
  UNLIKE_ARTIST_MUTATION,
} from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSession } from "next-auth/client";
import PersonIcon from "@material-ui/icons/Person";
import PaletteIcon from "@material-ui/icons/Palette";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const UserInfo = ({ children, artist, admin, userLiked }: Props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [liked, setLiked] = useState(userLiked);
  const [likeArtist] = useMutation(LIKE_ARTIST_MUTATION);
  const [unlikeArtist] = useMutation(UNLIKE_ARTIST_MUTATION);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session && !loading) {
      router.replace("/api/auth/signin");
    }
    if (!liked) {
      likeArtist({
        variables: { artistID: artist.id, userID: session.id },
      });
      setLiked(true);
    } else {
      unlikeArtist({
        variables: { artistID: artist.id, userID: session.id },
      });
      setLiked(false);
    }
  };

  return (
    <Box className={styles.userContainer}>
      <Paper className={styles.banner} elevation={6}>
        {artist ? (
          <Box className={styles.dp}>
            <Image src={artist.image} layout="fill" objectFit="contain" />
          </Box>
        ) : (
          ""
        )}
        <br />
        <Container style={{ flexGrow: 1, color: "white" }}>
          <Typography variant="h4">{artist.name}</Typography>
          <br />
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <CakeIcon className={styles.icon} /> Born in {artist.birthday}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <FlagIcon className={styles.icon} /> Lives in {artist.country}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <PersonIcon className={styles.icon} /> {artist.artLevel}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <PaletteIcon className={styles.icon} /> Specializes in &nbsp;
            {artist.artStyles.join(", ").toString()}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <BrushIcon className={styles.icon} /> Does &nbsp;
            {artist.artKinds.join(", ").toString()}
          </Typography>
        </Container>

        {!admin ? (
          <Container style={{ marginBottom: "16px" }}>
            <Button
              fullWidth
              className={liked ? styles.userOptions2 : styles.userOptions}
              onClick={handleLike}
            >
              <span>
                <Typography align="center">
                  <span className={styles.text}>
                    {" "}
                    <FavoriteBorderIcon
                      className={liked ? styles.icon2 : styles.icon}
                    />
                    {liked ? "Unlike Artist" : "Like Artist"}
                  </span>
                </Typography>
              </span>
            </Button>
            <Button fullWidth className={styles.userOptions}>
              <span>
                <Typography align="center">
                  <span className={styles.text}>
                    {" "}
                    <BrushIcon className={styles.icon} /> Commission Me!{" "}
                  </span>
                </Typography>
              </span>
            </Button>
          </Container>
        ) : (
          <Container style={{ marginBottom: "16px" }}>
            <Button fullWidth className={styles.userOptions2}>
              <span>
                <Typography align="center">
                  <span className={styles.text}>
                    {" "}
                    <EditIcon className={styles.icon} />
                    Edit Profile
                  </span>
                </Typography>
              </span>
            </Button>
          </Container>
        )}
      </Paper>
    </Box>
  );
};

export default UserInfo;
