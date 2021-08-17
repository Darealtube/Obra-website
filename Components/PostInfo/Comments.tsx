import {
  CircularProgress,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentList from "../CommentList";
import CommentForm from "../Forms/CreateComment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import usePagination from "../../Hooks/usePagination";
import dynamic from "next/dynamic";

const DynamicCommentDrawer = dynamic(() => import("./CommentDrawer"));

const Comments = ({ postID, fetchMore }) => {
  const commentToggle = useMediaQuery("(max-width:768px)");
  const [openComment, setOpenComment] = useState(false);
  const { More, hasMore, ref } = usePagination({
    key: "postId",
    fetchMore,
    info: postID.comments,
    limit: 4,
    key2: "comments",
    executeWhileUnscrollable: true,
  });

  const handleDrawer = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      <Box marginTop={4}>
        {commentToggle ? (
          <>
            <Typography align="center" variant="h6">
              Comments
            </Typography>
            <IconButton
              onClick={handleDrawer}
              sx={{ width: "100%" }}
              size="large"
            >
              <ExpandMoreIcon />
            </IconButton>
          </>
        ) : (
          <>
            <CommentForm id={postID.id} />
            <InfiniteScroll
              dataLength={postID.comments.edges.length}
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
              scrollThreshold={0.5}
            >
              <CommentList comments={postID.comments.edges} />
            </InfiniteScroll>
          </>
        )}
      </Box>
      <DynamicCommentDrawer
        id={postID.id}
        More={More}
        hasMore={hasMore}
        comments={postID.comments.edges}
        open={openComment}
        handleDrawer={handleDrawer}
        parentRef={ref}
      />
    </>
  );
};

export default Comments;
