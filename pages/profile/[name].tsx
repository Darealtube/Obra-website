import Appbar from "../../Components/Appbar/Appbar";
import { CssBaseline, Grid } from "@material-ui/core";
import Image from "next/image";
import styles from "../styles/Specific/Profile.module.css";
import { CardList } from "../../Components/CardList";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserandPosts } from "../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_POST_QUERY } from "../../apollo/apolloQueries";
import { getSession } from "next-auth/client";

const PostID = ({ name, id }) => {
  const { data: user } = useQuery(USER_POST_QUERY, {
    variables: {
      name: name,
    },
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{user?.userName.name}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      {user ? (
        <Image src={user?.userName.image} width={500} height={500} />
      ) : (
        ""
      )}
      <h1>{user?.userName.name}</h1>
      <Grid container className={styles.profile}>
        {user?.userName.posts ? (
          <CardList postData={user?.userName.posts} id={id} />
        ) : (
          <h3>This user has no posts.</h3>
        )}
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await fetchUserandPosts(context.params.name as string);
  const session = await getSession(context);
  if (!user.exists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: user.data,
      name: context.params.name,
      id: session.id,
    },
  };
};

export default PostID;
