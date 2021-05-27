import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline, CircularProgress, Typography } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import { CardList } from "../../../Components/CardList";
import Head from "next/head";
import { GetStaticProps } from "next";
import { fetchAllUsers, fetchUserandPosts } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_POST_QUERY } from "../../../apollo/apolloQueries";
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

const UserID = ({ name }: Props) => {
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, UserVars>(USER_POST_QUERY, {
    variables: {
      name: name,
      limit: 4,
    },
  });
  console.log(userName.likedBy);
  const { More, hasMore } = usePagination(
    "userName",
    fetchMore,
    userName?.posts,
    4,
    "posts"
  );

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap artist={userName}>
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

export const getStaticPaths = async () => {
  const userList = await fetchAllUsers();
  const paths = userList.map((name) => ({
    params: { name },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, exists } = await fetchUserandPosts(
    context.params.name as string
  );

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      name: context.params.name,
    },
    revalidate: 5,
  });
};

export default UserID;
