import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Popover,
} from "@material-ui/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../pages/styles/Specific/Post.module.css";
import { edges } from "../interfaces/HistoryInterface";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import HistoryEditMenu from "./ListItems/HistoryEditMenu";

const HistoryList = ({ histories }: { histories: edges[] }) => {
  const [editAnchor, seteditAnchor] = useState<null | HTMLElement>(null);
  const [targetId, settargetId] = useState<string>(null);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    seteditAnchor(e.currentTarget);
    settargetId(e.currentTarget.value);
  };

  const handleEditClose = () => {
    seteditAnchor(null);
    settargetId(null);
  };

  return (
    <div>
      <List className={styles.commentList}>
        {histories &&
          histories.map((history, index) => (
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                {history.node.viewed && ( // TEMPORARY
                  <Image
                    src={history.node.viewed.art}
                    width={100}
                    height={100}
                    className={styles.avatar}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  history.node.viewed
                    ? history.node.viewed.title
                    : "This post has been deleted"
                }
                secondary={
                  history.node.viewed ? (
                    <React.Fragment>{`You viewed this post ${moment(
                      history.node.lastDateViewed
                    ).fromNow()}`}</React.Fragment>
                  ) : (
                    ""
                  )
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={handleEdit}
                  value={history.node.id}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>

      <Popover
        anchorEl={editAnchor}
        keepMounted
        open={Boolean(editAnchor)}
        onClose={handleEditClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <HistoryEditMenu id={targetId} onClose={handleEditClose} />
        </List>
      </Popover>
    </div>
  );
};

export default HistoryList;
