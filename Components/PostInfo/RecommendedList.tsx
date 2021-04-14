import {
  Grid,
  Typography,
  Container,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Post.module.css";
import { CardList } from "../../Components/CardList";
import InfiniteScroll from "react-infinite-scroll-component";
import { RecommendedPosts } from "../../interfaces/PostInterface";
import usePagination from "../../Hooks/usePagination";
import { Session } from "next-auth/client";

type Parameters = {
  fetchMore: any;
  session: Session;
  recommended: RecommendedPosts;
};

const RecommendedList = ({ fetchMore, session, recommended }: Parameters) => {
  const { More, hasMore } = usePagination(
    "recommendedPosts",
    fetchMore,
    recommended
  );

  return (
    <Grid item xs={12} md={4} className={styles.recommended}>
      <Container>
        <Typography variant="h4" align="center">
          Recommended List
        </Typography>
        <Divider />
        {/* Recommended List */}
        <Container className={styles.recommendedList}>
          <InfiniteScroll
            dataLength={recommended.edges.length}
            next={More}
            hasMore={hasMore}
            loader={
              <>
                <br />
                <CircularProgress />
              </>
            }
            endMessage={
              <p>
                <b>Yay! You have seen it all</b>
              </p>
            }
            style={{
              overflow: "hidden",
            }}
          >
            <CardList postData={recommended.edges} id={session?.id} />
          </InfiniteScroll>
        </Container>
        {/* Recommended List */}
      </Container>
    </Grid>
  );
};

export default RecommendedList;
