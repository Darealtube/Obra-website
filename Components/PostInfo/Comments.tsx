import { CircularProgress, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentList from "../CommentList";
import CommentForm from "../Forms/CreateComment";
import usePagination from "../../Hooks/usePagination";

const Comments = ({ postID, fetchMore }) => {
  const { More, hasMore } = usePagination({
    key: "postId",
    fetchMore,
    info: postID.comments,
    limit: 4,
    key2: "comments",
    executeWhileUnscrollable: true,
  });

  return (
    <>
      <Box marginTop={4}>
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
      </Box>
    </>
  );
};

export default Comments;
