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

interface Props {
  id: string;
  More: () => void;
  hasMore: boolean;
  comments: edges[];
  open: boolean;
  handleDrawer: () => void;
  parentRef: (node: HTMLElement) => void;
}

const CommentDrawer = ({
  id,
  More,
  hasMore,
  comments,
  open,
  handleDrawer,
  parentRef,
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
          ref={parentRef}
        >
          <CommentForm
            id={id}
          />
          <InfiniteScroll
            dataLength={comments.length}
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
            <CommentList comments={comments} />
          </InfiniteScroll>
        </Container>
      </Drawer>
    </div>
  );
};

export default CommentDrawer;
