import {
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
  Grid,
  Badge,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ImageIcon from "@material-ui/icons/Image";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import BrushIcon from "@material-ui/icons/Brush";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import { COMMISSION_COUNT_QUERY } from "../../apollo/apolloQueries";
import Image from "next/image";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="#">Canvas</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const MoreItems = [
  {
    label: "Settings",
    link: "/settings/account/",
    icon: <SettingsIcon />,
  },
  {
    label: "Report",
    link: "/help/report",
    icon: <EmojiFlagsIcon />,
  },
  {
    label: "Help",
    link: "/help",
    icon: <InfoIcon />,
  },
  {
    label: "Feedback",
    link: "/help/feedback",
    icon: <ContactSupportIcon />,
  },
];

const TransactionItems = [
  {
    label: "Wallet",
    link: "/transactions/wallet",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    label: "Transaction History",
    link: "/transactions/history",
    icon: <ReceiptIcon />,
  },
  {
    label: "Your Cart",
    link: "/transactions/cart",
    icon: <ShoppingCartIcon />,
  },
];

const DrawerItems = () => {
  const [session] = useSession();
  const { data } = useQuery(COMMISSION_COUNT_QUERY, {
    variables: {
      id: session?.id,
    },
    skip: !session,
    pollInterval: 60000,
  });

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Image src="/obra-logo.png" height={40} width={40} alt={"Obra Logo"} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6">Obra</Typography>
        </ListItemText>
      </ListItem>
      <Divider />
      <Link href={"/home"} passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </Link>
      <ListItem button component="a" href={"/trending"}>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText>Trending</ListItemText>
      </ListItem>
      <ListItem button component="a" href={`/gallery/${session?.user.name}/`}>
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
        <ListItemText>Gallery</ListItemText>
      </ListItem>
      <ListItem
        button
        component="a"
        href={`/gallery/${session?.user.name}/liked`}
      >
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText>Liked Gallery</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="h5">Transactions</Typography>
      </ListItem>
      {TransactionItems.map((item) => (
        <>
          <Link href={item.link} key={item.link} passHref>
            <ListItem button component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          </Link>
        </>
      ))}
      <ListItem button component="a" href={"/commissions"}>
        <ListItemIcon>
          <BrushIcon />
        </ListItemIcon>
        <Badge color="secondary" badgeContent={data?.userId.commissionCount}>
          <ListItemText>Commissions</ListItemText>
        </Badge>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="h5">More</Typography>
      </ListItem>
      {MoreItems.map((item) => (
        <>
          <Link href={item.link} key={item.link} passHref>
            <ListItem button component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          </Link>
        </>
      ))}
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
