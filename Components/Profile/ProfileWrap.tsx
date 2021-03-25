import { Grid, Divider, Breadcrumbs, Button } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";

const ProfileWrap = ({ children, user, admin }) => {
  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12}>
        {user ? (
          <Image
            src={user.image}
            width={200}
            height={200}
            className={styles.image}
          />
        ) : (
          ""
        )}
        <h1>{user.name}</h1>
        <Divider />
        <br />
        <Breadcrumbs
          separator="|"
          aria-label="breadcrumb"
          className={styles.link}
        >
          <Button>
            <Link href={`/profile/${user.name}/`}>Posts</Link>
          </Button>
          <Button>
            <Link href={`/profile/${user.name}/liked`}>Liked Posts</Link>
          </Button>
          <Button>
            <Link href={`/profile/${user.name}/info`}>About</Link>
          </Button>
          {admin && (
            <Button>
              <Link href={`/profile/${user.name}/history`}>History</Link>
            </Button>
          )}
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12} className={styles.posts}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ProfileWrap;
