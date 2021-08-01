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
import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";

const DynamicCommentPopover = dynamic(
  () => import("./MainPopovers/CommentPopover")
);

type Props = {
  comments: edges[];
};

const CommentList = ({ comments }: Props) => {
  const [session] = useSession();
  const [editAnchor, seteditAnchor] = useState<null | HTMLElement>(null);
  const [targetId, settargetId] = useState(null);
  const [admin, setadmin] = useState<boolean>(null);

  // This opens up the popover, and the option will depend on the user if
  // the user is the same as the comment of the post.
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
                  src={
                    comment.node.author
                      ? comment.node.author.image
                      : "/user-empty-avatar.png"
                  }
                  width={40}
                  height={40}
                  className={styles.avatar}
                  alt={"Author Image"}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${
                  comment.node.author
                    ? comment.node.author.name
                    : "Deleted User"
                } commented ${comment.node.date}`}
                secondary={<>{comment.node.content}</>}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={handleEdit}
                  value={comment.node.id}
                  id={comment.node.author ? comment.node.author.id : ""}
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
