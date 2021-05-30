import { Button, Box, Paper, Typography, Container } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import EditIcon from "@material-ui/icons/Edit";
import dynamic from "next/dynamic";
import {
  LikeArtistData,
  UnlikeArtistData,
  UnlikeLikeArtistVars,
} from "../../interfaces/MutationInterfaces";

const DynamicUserDrawer = dynamic(() => import("./UserDrawer"));

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
  admin: boolean;
};

const UserInfo = ({ artist, admin }: Props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [liked, setLiked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [likeArtist] =
    useMutation<LikeArtistData, UnlikeLikeArtistVars>(LIKE_ARTIST_MUTATION);
  const [unlikeArtist] = useMutation<UnlikeArtistData, UnlikeLikeArtistVars>(
    UNLIKE_ARTIST_MUTATION
  );

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

  const OpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    setLiked(artist.likedBy.includes(session?.id));
  }, [session]);

  return (
    <Box className={styles.userContainer}>
      <Paper className={styles.banner} elevation={6}>
        <Box className={styles.dp}>
          <Image
            src={
              artist && artist.image ? artist.image : "/user-empty-avatar.png"
            }
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <br />
        {artist && (
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
        )}

        {!admin && artist ? (
          <Container style={{ marginBottom: "16px" }}>
            {session && (
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
            )}
            <Link
              href={`/profile/${encodeURIComponent(artist.name)}/commission`}
            >
              <Button fullWidth className={styles.userOptions} component="a">
                <span>
                  <Typography align="center">
                    <span className={styles.text}>
                      {" "}
                      <BrushIcon className={styles.icon} /> Commission Me!{" "}
                    </span>
                  </Typography>
                </span>
              </Button>
            </Link>
          </Container>
        ) : (
          <>
            <Link href={`/settings/account/`}>
              <Button fullWidth className={styles.userOptions} component="a">
                <span>
                  <Typography align="center">
                    <span className={styles.text}>
                      {" "}
                      <BrushIcon className={styles.icon} /> Edit Profile{" "}
                    </span>
                  </Typography>
                </span>
              </Button>
            </Link>
          </>
        )}
      </Paper>

      <DynamicUserDrawer
        artist={artist}
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </Box>
  );
};

export default UserInfo;
