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
import usePagination from "../../Hooks/usePagination";
import { PostComments } from "../../interfaces/PostInterface";

interface Props {
  id: string;
  comments: PostComments;
  open: boolean;
  handleDrawer: () => void;
  fetchMore: any;
}

const CommentDrawer = ({
  id,
  comments,
  open,
  handleDrawer,
  fetchMore,
}: Props) => {
  const { More, hasMore, ref } = usePagination({
    key: "postId",
    fetchMore,
    info: comments,
    limit: 4,
    key2: "comments",
    executeWhileUnscrollable: true,
  });

  return (
    <>
      <Drawer
        anchor={"right"}
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

          <IconButton onClick={handleDrawer} size="large">
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
          ref={ref}
        >
          <CommentForm id={id} />
          <InfiniteScroll
            dataLength={comments.edges.length}
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
            <CommentList comments={comments.edges} />
          </InfiniteScroll>
        </Container>
      </Drawer>
    </>
  );
};

export default CommentDrawer;
