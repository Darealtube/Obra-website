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
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";

type Props = {
  name: string;
  id: string;
  alreadyLiked: boolean;
};

const UserIDLiked = ({ name, id, alreadyLiked }: Props) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, UserVars>(USER_LIKED_POST_QUERY, {
    variables: {
      name: name,
      limit: 4,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName.likedPosts,
    4,
    "likedPosts"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Liked</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap
        artist={userName}
        admin={userName?.id === id}
        userLiked={alreadyLiked}
      >
        {userName && (
          <InfiniteScroll
            dataLength={userName.likedPosts.edges.length}
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
          >
            {userName.likedPosts ? (
              <CardList postData={userName.likedPosts.edges} />
            ) : (
              <h3>This user has no liked posts.</h3>
            )}
          </InfiniteScroll>
        )}
      </ProfileWrap>
    </div>
  );
};

/*  */

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, exists, alreadyLiked } = await fetchUserandLikedPosts(
    context.params.name as string,
    session ? session.id : null
  );

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session,
      name: context.params.name,
      id: session ? session.id : null,
      alreadyLiked: alreadyLiked,
    },
  });
};

export default UserIDLiked;
