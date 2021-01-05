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
import styles from "../styles/General/Home.module.css";

interface PostInterface {
  _id: string;
  author?: string;
  date: string;
  art: string;
  tags: string[];
  title: string;
  likes?: number;
  comments?: string[];
  forSale?: boolean;
  forSalePrice?: string;
}

export const CardList = ({ _id, date, art, title, tags }: PostInterface) => {
  return (
    <div>
      <Grid item key={_id}>
        <Card className={styles.card} style={{ marginBottom: "16px" }}>
          <CardHeader
            avatar={<Avatar aria-label="User">D</Avatar>}
            title="Author"
            subheader={date}
          />

          <CardMedia
            component="img"
            alt="Featured Art No.1"
            height="140"
            image={art}
            title="Featured Art No.1"
          />
          <Link href={`/${_id}`}>
            <CardActionArea>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={styles.title}
                >
                  {title}
                </Typography>
                <br />
                {tags.map((tag) => (
                  <Chip label={tag} className={styles.tag} />
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
    </div>
  );
};
