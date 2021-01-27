import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import styles from "../pages/styles/General/Home.module.css";
import { PostInterface } from "../interfaces/PostInterface";

type PostData = {
  postData: PostInterface[];
  error?: string;
};

export const CardList = ({ postData }: PostData) => {
  return (
    <div>
      <Grid container spacing={2}>
        {postData &&
          postData.map((post) => (
            <Grid item key={post._id}>
              <Card className={styles.card}>
                <CardHeader
                  avatar={
                    <Link href={`/profile/${post.author}`}>
                      <Avatar aria-label="User" src={post.picture} />
                    </Link>
                  }
                  title={post.author}
                  subheader={post.date}
                />

                <CardMedia
                  component="img"
                  alt="Featured Art No.1"
                  height="140"
                  image={post.art}
                  title="Featured Art No.1"
                />
                <Link href={`/${post._id}`}>
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
