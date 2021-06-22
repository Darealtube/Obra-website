import { Grid, Typography, Chip, Button } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import { PostInterface } from "../../interfaces/PostInterface";

import styles from "../../pages/styles/Specific/Post.module.css";

type Props = {
  postID: PostInterface;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
};

const Main = ({ postID, handleLike, liked, setOpen }: Props) => {
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
