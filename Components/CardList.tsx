import {
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  Container,
  IconButton,
  Popover,
  List,
} from "@material-ui/core";
import Link from "next/link";
import styles from "../pages/styles/General/Home.module.css";
import Image from "next/image";
import { PostInterface } from "../interfaces/PostInterface";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { EditMenu } from "./listItems";

type PostData = {
  postData: PostInterface[];
  error?: string;
};

export const CardList = ({ postData }: PostData) => {
  const [editAnchor, seteditAnchor] = useState<null | HTMLElement>(null);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    seteditAnchor(e.currentTarget);
  };

  const handleEditClose = () => {
    seteditAnchor(null);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {postData &&
          postData.map((post, index) => (
            <Grid item key={index}>
              <Card className={styles.card}>
                <CardHeader
                  avatar={
                    post.picture ? (
                      <Link href={`/profile/${post.author}`}>
                        <Image
                          src={post.picture}
                          width={40}
                          height={40}
                          className={styles.avatar}
                        />
                      </Link>
                    ) : (
                      <Avatar src="" />
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.author}
                  subheader={post.date}
                />

                <Container component="div" className={styles.artContainer}>
                  {post.art && (
                    <Image src={post.art} layout="fill" objectFit="contain" />
                  )}
                </Container>

                <Link href={`/${post.id}`}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        className={styles.title}
                      >
                        {post.title}
                      </Typography>
                      <br />
                      {post.tags.map((tag, index) => (
                        <Chip key={index} label={tag} className={styles.tag} />
                      ))}
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
