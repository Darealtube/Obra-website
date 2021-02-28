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
import EditMenu from "../Components/ListItems/EditMenu";

type PostData = {
  postData: PostInterface[];
  id: string;
  error?: string;
};

export const CardList = ({ postData, id }: PostData) => {
  const [editAnchor, seteditAnchor] = useState<null | HTMLElement>(null);
  const [targetId, settargetId] = useState<string>(null);
  const [admin, setadmin] = useState<boolean>(null);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    seteditAnchor(e.currentTarget);
    settargetId(e.currentTarget.value);
    setadmin(id === e.currentTarget.id);
  };

  const handleEditClose = () => {
    seteditAnchor(null);
    settargetId(null);
  };

  const handleEditExit = () => {
    setadmin(null);
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
                      <Link href={`/profile/${post.author.name}`}>
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
                    <IconButton
                      aria-label="settings"
                      onClick={handleEdit}
                      value={post.id}
                      id={post.author.id}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.author.name}
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
      <Popover
        anchorEl={editAnchor}
        keepMounted
        open={Boolean(editAnchor)}
        onClose={handleEditClose}
        onExited={handleEditExit}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <EditMenu
            id={targetId}
            admin={admin}
            onClose={handleEditClose}
            onExited={handleEditExit}
          />
        </List>
      </Popover>
    </div>
  );
};
