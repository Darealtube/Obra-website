import { List, Popover } from "@material-ui/core";
import React from "react";
import CommentEditMenu from "../ListItems/CommentEditMenu";

type Props = {
  editAnchor: HTMLElement;
  handleEditClose: () => void;
  handleEditExit: () => void;
  admin: boolean;
  targetId: string;
};

const CommentPopover = ({
  editAnchor,
  handleEditClose,
  handleEditExit,
  targetId,
  admin,
}: Props) => {
  return (
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
      TransitionProps={{
        onExited: handleEditExit
      }}>
      <List>
        <CommentEditMenu
          id={targetId}
          admin={admin}
          onClose={handleEditClose}
          onExited={handleEditExit}
        />
      </List>
    </Popover>
  );
};

export default CommentPopover;
