import {
  List,
  Typography,
  Divider,
  Avatar,
  Popover,
  Box,
} from "@material-ui/core";
import NoUserMenu from "../../ListItems/NoUserMenu";
import styles from "../../../pages/styles/Specific/Appbar.module.css";

type Props = {
  profAnchor: HTMLElement;
  handleProfileClose: () => void;
};

const NoUserPopover = ({ profAnchor, handleProfileClose }: Props) => {
  return (
    <Popover
      id="simple-menu"
      anchorEl={profAnchor}
      keepMounted
      open={Boolean(profAnchor)}
      onClose={handleProfileClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box display="flex" flexWrap="wrap" className={styles.box2}>
        <Avatar src="" />

        <div style={{ marginLeft: "25px" }}>
          <Typography>No Name</Typography>

          <Typography>No Email found</Typography>
        </div>
      </Box>
      <Divider />
      <List className={styles.menu}>
        <NoUserMenu />
      </List>
    </Popover>
  );
};

export default NoUserPopover;
