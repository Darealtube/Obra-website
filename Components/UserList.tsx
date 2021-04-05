import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
} from "@material-ui/core";
import Image from "next/image";
import React from "react";
import styles from "../pages/styles/Specific/Post.module.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { edges } from "../interfaces/UserInterface";

type Props = {
  users: edges[];
};

const UserList = ({ users }: Props) => {
  return (
    <List dense>
      {users &&
        users.map((user, index) => (
          <>
            <ListItem button key={index}>
              <ListItemAvatar>
                <Image
                  src={user.node.image}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </ListItemAvatar>
              <ListItemText primary={user.node.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
    </List>
  );
};

export default UserList;
