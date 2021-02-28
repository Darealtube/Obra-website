import Appbar from "../../../Components/Appbar/Appbar";
import { CssBaseline } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import { CardList } from "../../../Components/CardList";
import Head from "next/head";
import { GetServerSideProps } from "next";
import {
  fetchUserandLikedPosts,
  fetchUserandPosts,
} from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_LIKED_POST_QUERY } from "../../../apollo/apolloQueries";
import { getSession } from "next-auth/client";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";

const PostIDLiked = ({ name, id }) => {
  const { data: user } = useQuery(USER_LIKED_POST_QUERY, {
    variables: {
      name: name,
    },
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Liked</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap user={user}>
        {user?.userName.likedPosts ? (
          <CardList postData={user?.userName.likedPosts} id={id} />
        ) : (
          <h3>This user has no liked posts.</h3>
        )}
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
