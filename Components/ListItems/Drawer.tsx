import {
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
  Grid,
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
import Link from "next/link";

const DrawerItems = () => {
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

export default DrawerItems;
