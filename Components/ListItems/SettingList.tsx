import {
  List,
  ListItem,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import Link from "next/link";

const SettingList = () => {
  return (
    <>
      <List>
        <ListItem>
          <Typography variant="h3">Settings</Typography>
        </ListItem>
        <Divider />
        <Link href="/settings/account/" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/settings/commissionInfo/" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <BrushOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Commission Settings" />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </>
  );
};

export default SettingList;
