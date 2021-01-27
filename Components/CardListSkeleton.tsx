import {
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import styles from "../pages/styles/General/Home.module.css";
import { Skeleton } from "@material-ui/lab";

const CardListSkeleton = () => {
  const arr = ["1", "2", "3", "4"];
  return (
    <div>
      <Grid container spacing={4}>
        {arr.map((post, index) => (
          <Grid item key={index}>
            <Card className={styles.card}>
              <CardHeader
                avatar={
                  <Skeleton
                    variant="circle"
                    width={40}
                    height={40}
                    animation="wave"
                  />
                }
                title={<Skeleton animation="wave" />}
                subheader={<Skeleton animation="wave" />}
              />

              <Skeleton
                variant="rect"
                width={500}
                height={140}
                animation="wave"
              />

              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={styles.title}
                  >
                    <Skeleton animation="wave" />
                  </Typography>
                  <br />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Skeleton animation="wave" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CardListSkeleton;
