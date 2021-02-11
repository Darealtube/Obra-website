import Appbar from "../../Components/Appbar";
import { CssBaseline, Grid } from "@material-ui/core";
import Image from "next/image";
import styles from "../styles/Specific/Profile.module.css";
import { CardList } from "../../Components/CardList";
import Head from "next/head";
import { PostInterface } from "../../interfaces/PostInterface";
import { GetServerSideProps } from "next";
import { fetchUserandPosts } from "../../utils/fetchData";
import { UserInterface } from "../../interfaces/UserInterface";

const PostID = ({ user }: { user: UserInterface }) => {
  const userPosts = user.posts;
  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{user.name}</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <Image src={user.image} width={500} height={500} />
      <h1>{user.name}</h1>
      <Grid container className={styles.profile}>
        {user.posts ? (
          <CardList postData={userPosts} />
        ) : (
          <h3>This user has no posts.</h3>
        )}
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await fetchUserandPosts(context.params.name as string);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default PostID;
