import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import { CardList } from "../../../Components/CardList";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserandLikedPosts } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_LIKED_POST_QUERY } from "../../../apollo/apolloQueries";
import { getSession } from "next-auth/client";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const PostIDLiked = ({ name, id }) => {
  const { data: user, fetchMore } = useQuery(USER_LIKED_POST_QUERY, {
    variables: {
      name: name,
    },
  });
  const [postCount, setpostCount] = useState(user?.userName.likedPosts.length);
  const [hasMore, sethasMore] = useState(true);

  const loadMore = () => {
    fetchMore({
      variables: { offset: user.userName.likedPosts.length, name: name },
    });
  };

  useEffect(() => {
    setpostCount(user?.userName.likedPosts.length);
    sethasMore(
      user?.userName.likedPosts.length < user.userName.likedPostslength
        ? true
        : false
    );
  }, [user]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Liked</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap user={user}>
        <InfiniteScroll
          dataLength={postCount}
          next={loadMore}
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
          {user?.userName.likedPosts ? (
            <CardList postData={user?.userName.likedPosts} id={id} />
          ) : (
            <h3>This user has no liked posts.</h3>
          )}
        </InfiniteScroll>
      </ProfileWrap>
    </div>
  );
};

/*  */

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await fetchUserandLikedPosts(context.params.name as string);
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

export default PostIDLiked;
