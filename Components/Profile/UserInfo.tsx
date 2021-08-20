import { Button, Box, Typography, Container } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import { UserInterface } from "../../interfaces/UserInterface";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BrushIcon from "@material-ui/icons/Brush";
import { LIKE_UNLIKE_ARTIST_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSession } from "next-auth/client";
import {
  LikeUnlikeArtistData,
  UnlikeLikeArtistVars,
} from "../../interfaces/MutationInterfaces";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import CakeIcon from "@material-ui/icons/Cake";
import FlagIcon from "@material-ui/icons/Flag";
import PersonIcon from "@material-ui/icons/Person";
import PaletteIcon from "@material-ui/icons/Palette";
import SettingsIcon from "@material-ui/icons/Settings";

type Props = {
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const UserInfo = ({ artist, admin, userLiked }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [session, loading] = useSession();
  const [liked, setLiked] = useState(userLiked);
  const [likeArtist] = useMutation<LikeUnlikeArtistData, UnlikeLikeArtistVars>(
    LIKE_UNLIKE_ARTIST_MUTATION
  );

  // handleLike will handle like and unlike functionality. It will update
  // the post's liked status even when the user comes out and in repeatedly.
  // It will redirect to the signIn page when it does not have session.
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!liked) {
      setLiked(true);
      setDisabled(true);
      likeArtist({
        variables: { artistID: artist.id, userID: session.id, action: "like" },
        update: () => {
          setDisabled(false);
        },
      });
    } else {
      setLiked(false);
      setDisabled(true);
      likeArtist({
        variables: {
          artistID: artist.id,
          userID: session.id,
          action: "unlike",
        },
        update: () => {
          setDisabled(false);
        },
      });
    }
  };

  return (
    <Container className={styles.userContainer}>
      <Image
        src={artist && artist.image ? artist.image : "/user-empty-avatar.png"}
        width={160}
        height={160}
        className={styles.avatar}
        alt={"User Image"}
      />
      <br />
      {artist && (
        <>
          <Typography variant="h4" gutterBottom>
            {artist.name}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
            paragraph
          >
            {artist.userBio && <Typography>{artist.userBio}</Typography>}
          </Typography>
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

          <Box width="80%">
            <Link href={`/gallery/${artist.name}`} passHref>
              <Button
                fullWidth
                component="a"
                variant="outlined"
                sx={{ marginBottom: "8px" }}
                startIcon={<PhotoAlbumIcon color="inherit" />}
              >
                <Typography align="center" color="black">
                  Gallery
                </Typography>
              </Button>
            </Link>
            {!admin && session && !loading ? (
              <>
                <Button
                  fullWidth
                  onClick={handleLike}
                  disabled={disabled}
                  variant="outlined"
                  sx={{ marginBottom: "8px" }}
                  startIcon={<FavoriteBorderIcon color="inherit" />}
                >
                  <Typography align="center" color="black">
                    {liked ? "Unlike Artist" : "Like Artist"}
                  </Typography>
                </Button>
                <Link
                  href={`/profile/${encodeURIComponent(
                    artist.name
                  )}/commission`}
                  passHref
                >
                  <Button
                    fullWidth
                    component="a"
                    variant="outlined"
                    sx={{ marginBottom: "8px" }}
                    startIcon={<BrushIcon color="inherit" />}
                  >
                    <Typography align="center" color="black">
                      Commission Me!
                    </Typography>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/settings/account/`} passHref>
                  <Button
                    fullWidth
                    component="a"
                    variant="outlined"
                    sx={{ marginBottom: "8px" }}
                    startIcon={<SettingsIcon color="inherit" />}
                  >
                    <Typography align="center" color="black">
                      Edit Profile{" "}
                    </Typography>
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserInfo;
