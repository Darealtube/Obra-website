import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import { CardList } from "../../../Components/CardList";
import Head from "next/head";
import { GetStaticProps } from "next";
import {
  fetchAllUsers,
  fetchUserandLikedPosts,
} from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_LIKED_POST_QUERY } from "../../../apollo/apolloQueries";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";
import usePagination from "../../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserData, UserVars } from "../../../interfaces/QueryInterfaces";

type Props = {
  name: string;
  id: string;
  alreadyLiked: boolean;
};

const UserIDLiked = ({ name }: Props) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, UserVars>(USER_LIKED_POST_QUERY, {
    variables: {
      name: name,
    },
  });
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName.likedPosts,
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
      <ProfileWrap artist={userName}>
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

export const getStaticPaths = async () => {
  const userList = await fetchAllUsers();
  const paths = userList.map((name) => ({
    params: { name },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const user = await fetchUserandLikedPosts(context.params.name as string);

  if (!user.exists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: user.data,
      name: context.params.name,
    },
    revalidate: 5,
  };
};

export default UserIDLiked;
