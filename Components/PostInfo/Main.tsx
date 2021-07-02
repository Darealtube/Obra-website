import { useMutation } from "@apollo/client";
import { Grid, Typography, Chip, Button } from "@material-ui/core";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { LIKE_MUTATION, UNLIKE_MUTATION } from "../../apollo/apolloQueries";
import {
  LikeData,
  UnlikeLikeVars,
  UnlikeData,
} from "../../interfaces/MutationInterfaces";
import { PostInterface } from "../../interfaces/PostInterface";

import styles from "../../pages/styles/Specific/Post.module.css";

type Props = {
  postID: PostInterface;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alreadyLiked: boolean;
};

const Main = ({ postID, setOpen, alreadyLiked }: Props) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [liked, setLiked] = useState(alreadyLiked);
  const [session, loading] = useSession();

  const [like] = useMutation<LikeData, UnlikeLikeVars>(LIKE_MUTATION);
  const [unlike] = useMutation<UnlikeData, UnlikeLikeVars>(UNLIKE_MUTATION);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session && !loading) {
      router.replace("/api/auth/signin");
    }

    if (!liked) {
      setLiked(true);
      setDisabled(true);
      like({
        variables: { postId: postID.id, userID: session?.id },
        update: () => {
          setDisabled(false);
        },
      });
    } else {
      setLiked(false);
      setDisabled(true);
      unlike({
        variables: { postId: postID.id, userID: session?.id },
        update: () => {
          setDisabled(false);
        },
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className={styles.artContainer}>
        {postID.art && (
          <Image
            src={postID.art}
            layout="fill"
            objectFit="contain"
            onClick={() => setOpen(true)}
            alt={"Art Image"}
          />
        )}
      </Grid>
      <Grid item xs={6} className={styles.information}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ wordWrap: "break-word" }}>
              {postID.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{postID.author.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {postID.sale === "No" ? "Showcase only" : "₱" + postID.price}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {postID.tags?.map((tag) => {
              <Chip label={tag} className={styles.tag}></Chip>;
            })}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ wordWrap: "break-word" }}>
              {postID.description}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={handleLike}
              style={liked === true ? { color: "red" } : { color: "inherit" }}
              disabled={disabled}
            >
              LIKE
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button>ADD</Button>
          </Grid>
          <Grid item xs={4}>
            <Button>SHARE</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
