import {
  CircularProgress,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Container,
} from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentList from "../CommentList";
import CommentForm from "../Forms/CreateComment";
import CloseIcon from "@material-ui/icons/Close";
import { edges } from "../../interfaces/CommentInterface";
import { Session } from "next-auth/client";

interface Props {
  comment: {
    postID: string;
    content: string;
    author: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  page: number;
  More: () => void;
  hasMore: boolean;
  comments: edges[];
  session: Session;
  open: boolean;
  handleDrawer: () => void;
}

const CommentDrawer = ({
  comment,
  handleChange,
  handleSubmit,
  page,
  More,
  hasMore,
  comments,
  session,
  open,
  handleDrawer,
}: Props) => {
  return (
    <div>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={handleDrawer}
        style={{
          overflow: "auto",
        }}
      >
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Comments
          </Typography>

          <IconButton onClick={handleDrawer}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <br />

        <Container
          style={{
            overflow: "auto",
            height: "100rem",
          }}
          id="Scrollable"
        >
          <CommentForm
            comment={comment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <InfiniteScroll
            dataLength={page}
            next={More}
            hasMore={hasMore}
            loader={
              <>
                <br />
                <CircularProgress />
              </>
            }
            style={{
              overflow: "hidden",
              textAlign: "center",
            }}
            scrollThreshold={1}
            scrollableTarget="Scrollable"
          >
            <CommentList comments={comments} id={session.id} />
          </InfiniteScroll>
        </Container>
      </Drawer>
    </div>
  );
};

export default CommentDrawer;
