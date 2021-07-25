import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress, Typography } from "@material-ui/core";
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
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";

type Props = {
  name: string;
  id: string;
  alreadyLiked: boolean;
};

const UserID = ({ name, id, alreadyLiked }: Props) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, QueryNameVars>(USER_POST_QUERY, {
    variables: {
      name: name,
      limit: 4,
    },
  });

  const { More, hasMore } = usePagination({
    key: "userName",
    fetchMore,
    info: userName.posts,
    limit: 4,
    key2: "posts",
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap
        artist={userName}
        admin={userName?.id == id}
        userLiked={alreadyLiked}
      >
        {userName ? (
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
              <CardList postData={userName.posts.edges} />
            ) : (
              <h3>This user has no posts.</h3>
            )}
          </InfiniteScroll>
        ) : (
          <Typography variant="h5">
            This user has been deleted, or has changed their name.
          </Typography>
        )}
      </ProfileWrap>
    </div>
  );
};

/*  */

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, alreadyLiked, exists } = await fetchUserandPosts(
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

export default UserID;
