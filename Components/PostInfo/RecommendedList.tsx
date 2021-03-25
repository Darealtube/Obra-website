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
import { edges, PostInterface } from "../../interfaces/PostInterface";
import { Session } from "next-auth/client";

type Parameters = {
  page: number;
  More: () => void;
  hasMore: boolean;
  recommendedPosts: edges[];
  session: Session;
};

const RecommendedList = ({
  page,
  More,
  hasMore,
  recommendedPosts,
  session,
}: Parameters) => {
  return (
    <Grid item lg={4} className={styles.recommended}>
      <Container>
        <Typography variant="h4">Recommended List</Typography>
        <Divider />
        {/* Recommended List */}
        <Container className={styles.recommendedList}>
          <InfiniteScroll
            dataLength={page * 4}
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
            <CardList postData={recommendedPosts} id={session?.id} />
          </InfiniteScroll>
        </Container>
        {/* Recommended List */}
      </Container>
    </Grid>
  );
};

export default RecommendedList;
