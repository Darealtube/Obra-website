import {
  List,
  Typography,
  Divider,
  Avatar,
  Popover,
  Box,
} from "@material-ui/core";
import Image from "next/image";
import Menu from "../../ListItems/Menu";
import styles from "../../../pages/styles/Specific/Appbar.module.css";
import { AppbarUserData } from "../../../interfaces/QueryInterfaces";

type Props = {
  profAnchor: HTMLElement;
  handleProfileClose: () => void;
  user: AppbarUserData;
};

const UserPopover = ({ profAnchor, handleProfileClose, user }: Props) => {
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
      <Box display="flex" flexWrap="wrap" className={styles.box}>
        {user.userId.image ? (
          <Image
            src={user.userId.image}
            width={45}
            height={45}
            className={styles.avatar}
          />
        ) : (
          <Avatar src="" />
        )}
        <div style={{ marginLeft: "25px" }}>
          {user.userId.name ? (
            <Typography>{user.userId.name}</Typography>
          ) : (
            <Typography>No Name</Typography>
          )}
          {user.userId.email ? (
            <Typography>{user.userId.email}</Typography>
          ) : (
            <Typography>No Email found</Typography>
          )}
        </div>
      </Box>
      <Divider />
      <List className={styles.menu}>
        <Menu name={user.userId.name} />{" "}
        {/* List that is dropped down when you click the user avatar. */}
      </List>
    </Popover>
  );
};

export default UserPopover;
