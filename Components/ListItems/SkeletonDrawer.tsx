import {
  ListItem,
  Typography,
  Divider,
  Grid,
  Skeleton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Link from "next/link";

const MainItems = ["20%", "25%", "21%", "40%", "32%", "28%"];
const MoreItems = ["25%", "32%", "18%", "30%", "24%"];

const SkeletonDrawer = () => {
  return (
    <div>
      {MainItems.map((width, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Skeleton variant="rectangular" width={width} />
              </>
            }
          />
        </ListItem>
      ))}
      <Divider />
      <ListItem>
        <Typography variant="h5">More</Typography>
      </ListItem>
      {MoreItems.map((width, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Skeleton variant="rectangular" width={width} />
              </>
            }
          />
        </ListItem>
      ))}
      <Divider />
      <ListItem>
        <Grid container spacing={2}>
          <Grid item>
            <Link href="/about" passHref>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography>About</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/about" passHref>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography>Terms and Conditions</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/about#developers" passHref>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography>Developers</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/about#contacts" passHref>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography>Contact Us</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <Typography>Canvas Tutorial</Typography>
            </a>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export default SkeletonDrawer;
