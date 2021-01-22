import { useRouter } from "next/router";
import {
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
  Grid,
  Button,
  Theme,
  makeStyles,
  createStyles,
  Avatar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PaletteIcon from "@material-ui/icons/Palette";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ImageIcon from "@material-ui/icons/Image";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TranslateIcon from "@material-ui/icons/Translate";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import Link from "next/link";
import { NotifInterface, UserInterface } from "../interfaces/UserInterface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
    item: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
    },
    notifitem: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    notifInfo: {
      flexDirection: "column",
      marginRight: theme.spacing(10),
    },
  })
);

export const Items = () => {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link href="#">Canvas</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <div>
      <ListItem>
        <Typography variant="h4">
          <span>
            <PaletteIcon fontSize="large" /> Canvas
          </span>
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText>Trending Art</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText>Recommended</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
        <ListItemText>Your Art</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText>Liked Arts</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="h5">Transactions</Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText>Wallet</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText>Transaction History</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText>Your Cart</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="h5">More</Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <EmojiFlagsIcon />
        </ListItemIcon>
        <ListItemText>Report</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText>Help</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ContactSupportIcon />
        </ListItemIcon>
        <ListItemText>Feedback</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>About</Typography>
          </Grid>
          <Grid item>
            <Typography>Terms and Conditions</Typography>
          </Grid>
          <Grid item>
            <Typography>Developers</Typography>
          </Grid>
          <Grid item>
            <Typography>Contact Us</Typography>
          </Grid>
          <Grid item>
            <Typography>Canvas Tutorial</Typography>
          </Grid>
        </Grid>
      </ListItem>
      <ListItem>
        <Copyright />
      </ListItem>
    </div>
  );
};

type userName = {
  name: string;
};

export const Menu = ({ name }: userName) => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <div>
      <ListItem>
        <Button
          className={classes.item}
          onClick={() => router.push(`/profile/${name}`)}
        >
          <AccountCircleIcon className={classes.icon} /> Profile
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          {" "}
          <PeopleAltIcon className={classes.icon} /> Switch account
        </Button>
      </ListItem>
      <ListItem>
        <Button
          className={classes.item}
          onClick={() => router.push("/api/Authentication/logout")}
        >
          <ExitToAppIcon className={classes.icon} /> Logout
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button className={classes.item}>
          <TranslateIcon className={classes.icon} /> Language
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <LanguageIcon className={classes.icon} /> Location
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <SettingsApplicationsIcon className={classes.icon} /> Settings
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <InfoIcon className={classes.icon} /> Help
        </Button>
      </ListItem>
      <ListItem>
        <Button className={classes.item}>
          <ContactSupportIcon className={classes.icon} /> Send Feedback
        </Button>
      </ListItem>
    </div>
  );
};

type NotifData = {
  notifications: NotifInterface[];
  user: UserInterface;
};

export const Notification = ({ notifications, user }: NotifData) => {
  const classes = useStyles();
  return (
    <div>
      {notifications && notifications.length > 0 ? (
        notifications.map((notif) => (
          <ListItem className={classes.notifitem} key={notif.postId}>
            <Avatar className={classes.icon}>{notif.user.picture}</Avatar>
            <div>
              <Typography>{notif.date}</Typography>
              <Typography className={classes.notifInfo}>
                {notif.description}
              </Typography>
            </div>
          </ListItem>
        ))
      ) : !user.email_verified ? (
        <ListItem className={classes.notifitem}>
          <Avatar className={classes.icon}>O</Avatar>
          <div>
            <Typography className={classes.notifInfo}>
              Obra says: Thank you for staying with us! We'd like you to verify
              your email for security purposes. Check your Gmail for the
              verification link. We appreciate it!
            </Typography>
          </div>
        </ListItem>
      ) : (
        ""
      )}
    </div>
  );
};
