import { Button, Box, Typography, Container } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import { UserInterface } from "../../interfaces/UserInterface";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BrushIcon from "@material-ui/icons/Brush";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSession } from "next-auth/client";
import {
  LikeUnlikeArtistData,
  UnlikeLikeArtistVars,
} from "../../interfaces/MutationInterfaces";
import CakeIcon from "@material-ui/icons/Cake";
import FlagIcon from "@material-ui/icons/Flag";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { LIKE_UNLIKE_ARTIST_MUTATION } from "../../apollo/Mutations/postMutations";

type Props = {
  artist: UserInterface;
  userLiked: boolean;
};

const UserInfo = ({ artist, userLiked }: Props) => {
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src={artist && artist.image ? artist.image : "/user-empty-avatar.png"}
        width={160}
        height={160}
        className={styles.avatar}
        alt={"User Image"}
      />
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        {artist.name}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={styles.text}
        gutterBottom
        paragraph
      >
        {artist.userBio || "No Bio"}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={styles.text}
        gutterBottom
      >
        <CakeIcon className={styles.icon} />{" "}
        {artist.birthday ? `Born in ${artist.birthday}` : "Birthday unknown"}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={styles.text}
        gutterBottom
      >
        <FlagIcon className={styles.icon} />{" "}
        {artist.country ? `Lives in ${artist.country}` : "Country Unknown"}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={styles.text}
        gutterBottom
      >
        <PersonIcon className={styles.icon} />{" "}
        {artist.artLevel || "Profession Unknown"}
      </Typography>

      <Box width="80%">
        {artist.id != session?.id ? (
          <>
            {session && !loading && (
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
            )}
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
    </Container>
  );
};

export default UserInfo;
