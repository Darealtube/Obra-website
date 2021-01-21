import Appbar from "../../Components/Appbar";
import useSWR from "swr";
import { CssBaseline, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { UserPropId } from "../../interfaces/UserInterface";
import fetch from "unfetch";
import styles from "../styles/Specific/Profile.module.css";
import { PostProp } from "../../interfaces/PostInterface";
import { CardList } from "../../Components/CardList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostID = () => {
  const router = useRouter();
  const { data: user, error } = useSWR(
    `/api/Users/profiles/${router.query.name}`,
    fetcher
  ) as UserPropId;
  const { data: posts } = useSWR(
    `/api/Users/profiles/${router.query.name}/posts`,
    fetcher
  ) as PostProp;
  if (error) return <h1>Something went wrong!</h1>;
  if (!user) return <h1>Loading</h1>;

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Appbar userData={user} />
      <Image src={user.picture} width={500} height={500} />
      <h1>{user.name}</h1>
      <Grid container className={styles.profile}>
        {user.posts ? (
          <CardList postData={posts} />
        ) : (
          <h3>This user has no posts.</h3>
        )}
      </Grid>
    </div>
  );
};

export default PostID;
