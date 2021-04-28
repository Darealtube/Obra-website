import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../pages/styles/Specific/Post.module.css";
import { edges } from "../interfaces/CommentInterface";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";

const DynamicCommentPopover = dynamic(
  () => import("./MainPopovers/CardPopover")
);

type Props = {
  comments: edges[];
};

const CommentList = ({ comments }: Props) => {
  const [session] = useSession();
  const [editAnchor, seteditAnchor] = useState<null | HTMLElement>(null);
  const [targetId, settargetId] = useState(null);
  const [admin, setadmin] = useState<boolean>(null);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    seteditAnchor(e.currentTarget);
    settargetId(e.currentTarget.value);
    setadmin(session?.id === e.currentTarget.id);
  };

  const handleEditClose = () => {
    seteditAnchor(null);
    settargetId(null);
  };

  const handleEditExit = () => {
    setadmin(null);
  };

  return (
    <div>
      <List className={styles.commentList}>
        {comments &&
          comments.map((comment, index) => (
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <Image
                  src={comment.node.author.image}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${comment.node.author.name} commented ${moment(
                  comment.node.date
                ).fromNow()}`}
                secondary={
                  <React.Fragment>{comment.node.content}</React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={handleEdit}
                  value={comment.node.id}
                  id={comment.node.author.id}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>

      <DynamicCommentPopover
        editAnchor={editAnchor}
        handleEditClose={handleEditClose}
        handleEditExit={handleEditExit}
        admin={admin}
        targetId={targetId}
      />
    </div>
  );
};

export default CommentList;
