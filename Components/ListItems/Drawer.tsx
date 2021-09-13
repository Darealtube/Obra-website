import {
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
  Grid,
  Badge,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import BrushIcon from "@material-ui/icons/Brush";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { signOut, useSession } from "next-auth/client";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { COMMISSION_COUNT_QUERY } from "../../apollo/Queries/commsQueries";
import PersonIcon from "@material-ui/icons/Person";
import { REPORT_COUNT_QUERY } from "../../apollo/Queries/reportQueries";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import dynamic from "next/dynamic";
import { AppbarUserData } from "../../interfaces/QueryInterfaces";
import { useState } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="#">Canvas</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const DynamicNotifPop = dynamic(() => import("../Appbar/Popovers/NotifPop"));
const DynamicSearchBar = dynamic(() => import("../SearchBar"));

const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  signOut({ callbackUrl: "https://obra-website.vercel.app/" });
};

const MoreItems = [
  {
    label: "Settings",
    link: "/settings/account/",
    icon: <SettingsIcon />,
  },
  {
    label: "Report a Bug",
    link: "/bugreport",
    icon: <EmojiFlagsIcon />,
  },
];

type DrawerProps = {
  user: AppbarUserData;
  moreNotif: any;
};

const DrawerItems = ({ user, moreNotif }: DrawerProps) => {
  const [session] = useSession();
  const { data } = useQuery(COMMISSION_COUNT_QUERY, {
    variables: {
      id: session?.id,
    },
    skip: !session,
  });
  const { data: reports } = useQuery(REPORT_COUNT_QUERY, {
    skip: !user?.userId.admin,
  });
  const [openSearch, setOpenSearch] = useState(false);

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <>
      <ListItem button onClick={toggleSearch}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        Search
      </ListItem>
      <Link href={"/"} passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </Link>
      <Link href={"/trending"} passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText>Trending</ListItemText>
        </ListItem>
      </Link>
      {session && (
        <>
          <Link href={`/profile/${user.userId.name}/`} passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </Link>
          <Link href={`/profile/${user.userId.name}/liked`} passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText>Your Liked Posts</ListItemText>
            </ListItem>
          </Link>
          <Link href={"/commissions"} passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <BrushIcon />
              </ListItemIcon>
              <Badge
                color="secondary"
                badgeContent={data?.userId.commissionCount}
              >
                <ListItemText>Commissions</ListItemText>
              </Badge>
            </ListItem>
          </Link>
          <DynamicNotifPop user={user} fetchMore={moreNotif} />
          <ListItem component={Button} onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </ListItem>
        </>
      )}
      <Divider />
      <ListItem>
        <Typography variant="h5">More</Typography>
      </ListItem>
      {MoreItems.map((item) => (
        <Link href={item.link} key={item.link} passHref>
          <ListItem button component="a">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Link>
      ))}
      {user?.userId.admin && (
        <Link href="/issues/post" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <PriorityHighIcon />
            </ListItemIcon>
            <Badge
              color="secondary"
              badgeContent={reports?.reportCount.totalCount}
            >
              <ListItemText>Issues</ListItemText>
            </Badge>
          </ListItem>
        </Link>
      )}
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
        </Grid>
      </ListItem>
      <ListItem>
        <Copyright />
      </ListItem>
      <DynamicSearchBar searchOpen={openSearch} handleClose={toggleSearch} />{" "}
      {/* SearchBar Popover */}
    </>
  );
};

export default DrawerItems;
