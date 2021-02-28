import { Grid, Divider, Breadcrumbs, Button } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";

const ProfileWrap = ({ children, user }) => {
  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12}>
        {user ? (
          <Image
            src={user?.userName.image}
            width={200}
            height={200}
            className={styles.image}
          />
        ) : (
          ""
        )}
        <h1>{user?.userName.name}</h1>
        <Divider />
        <br />
        <Breadcrumbs
          separator="|"
          aria-label="breadcrumb"
          className={styles.link}
        >
          <Button>
            <Link href={`/profile/${user?.userName.name}/`}>Posts</Link>
          </Button>
          <Button>
            <Link href={`/profile/${user?.userName.name}/liked`}>
              Liked Posts
            </Link>
          </Button>
          <Button>
            <Link href={`/profile/${user?.userName.name}/info`}>About</Link>
          </Button>
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12} className={styles.posts}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ProfileWrap;
