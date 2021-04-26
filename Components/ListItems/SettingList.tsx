import {
  List,
  ListItem,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const SettingList = () => {
  return (
    <>
      <List>
        <ListItem>
          <Typography variant="h3">Settings</Typography>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <Divider />
      </List>
    </>
  );
};

export default SettingList;
