import { Button, Box, Paper, Typography, Container } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import { UserInterface } from "../../interfaces/UserInterface";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BrushIcon from "@material-ui/icons/Brush";
import {
  LIKE_ARTIST_MUTATION,
  UNLIKE_ARTIST_MUTATION,
} from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSession } from "next-auth/client";
import EditIcon from "@material-ui/icons/Edit";
import dynamic from "next/dynamic";
import { LikeArtistData, UnlikeArtistData, UnlikeLikeArtistVars } from "../../interfaces/MutationInterfaces";

const DynamicEditDrawer = dynamic(() => import("./EditDrawer"));
const DynamicUserDrawer = dynamic(() => import("./UserDrawer"));

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
  userLiked: boolean;
};

const UserInfo = ({ artist, admin, userLiked }: Props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [liked, setLiked] = useState(userLiked);
  const [likeArtist] = useMutation<LikeArtistData, UnlikeLikeArtistVars>(LIKE_ARTIST_MUTATION);
  const [unlikeArtist] = useMutation<UnlikeArtistData, UnlikeLikeArtistVars>(UNLIKE_ARTIST_MUTATION);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

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

  const OpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  const OpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Box className={styles.userContainer}>
      <Paper className={styles.banner} elevation={6}>
        {artist ? (
          <Box className={styles.dp}>
            <Image
              src={artist.image ? artist.image : "/user-empty-avatar.png"}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        ) : (
          ""
        )}
        <br />
        <Container
          style={{ flexGrow: 1, color: "white", wordBreak: "break-word" }}
        >
          <Typography variant="h4">{artist.name}</Typography>
          <br />
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            {artist.userBio && <Typography>{artist.userBio}</Typography>}
          </Typography>
          <Button
            fullWidth
            className={styles.userOptions2}
            onClick={OpenDialog}
          >
            <span>
              <Typography align="center">
                <span className={styles.text}>
                  {" "}
                  <EditIcon className={styles.icon} />
                  More information
                </span>
              </Typography>
            </span>
          </Button>
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
            <Button
              fullWidth
              className={styles.userOptions2}
              onClick={OpenEditDialog}
            >
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

      <DynamicUserDrawer
        artist={artist}
        open={openDialog}
        setOpen={setOpenDialog}
      />
      <DynamicEditDrawer
        artist={artist}
        setOpen={setOpenEditDialog}
        open={openEditDialog}
      />
    </Box>
  );
};

export default UserInfo;
