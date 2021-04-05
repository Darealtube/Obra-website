import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import { CardList } from "../../../Components/CardList";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserandPosts } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_POST_QUERY } from "../../../apollo/apolloQueries";
import { getSession } from "next-auth/client";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";

const PostID = ({ name, id, alreadyLiked }) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery(USER_POST_QUERY, {
    variables: {
      name: name,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName.posts,
    "posts"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{userName.name}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap
        artist={userName}
        admin={userName.id == id}
        userLiked={alreadyLiked}
      >
        <InfiniteScroll
          dataLength={userName.posts.edges.length}
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
        >
          {userName.posts ? (
            <CardList postData={userName.posts.edges} id={id} />
          ) : (
            <h3>This user has no posts.</h3>
          )}
        </InfiniteScroll>
      </ProfileWrap>
    </div>
  );
};

/*  */

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = await fetchUserandPosts(
    context.params.name as string,
    session.id
  );

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
      alreadyLiked: user.alreadyLiked,
    },
  };
};

export default PostID;
