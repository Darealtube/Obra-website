import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserHistory } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_HISTORY_QUERY } from "../../../apollo/apolloQueries";
import { getSession } from "next-auth/client";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import HistoryList from "../../../Components/HistoryList";

const PostIDHistory = ({ name, id }) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery(USER_HISTORY_QUERY, {
    variables: {
      name: name,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName.history,
    "history"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Liked</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap user={userName} admin={userName.id === id}>
        <InfiniteScroll
          dataLength={userName.history.edges.length}
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
          }}
          scrollThreshold={1}
        >
          {userName.history ? (
            <HistoryList histories={userName.history.edges} />
          ) : (
            <h3>You have not viewed any posts yet.</h3>
          )}
        </InfiniteScroll>
      </ProfileWrap>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await fetchUserHistory(context.params.name as string);
  const session = await getSession(context);
  if (!user.exists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: user.data,
      session: session,
      name: context.params.name,
      id: session.id,
    },
  };
};

export default PostIDHistory;
