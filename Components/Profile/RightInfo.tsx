import {
  Box,
  Button,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Profile.module.css";
import Link from "next/link";

const RightInfo = ({ children, artist }) => {
  return (
    <Box className={styles.postContainer}>
      <Box justifyContent="center" alignItems="center" marginBottom={8}>
        <Button className={styles.button}>
          <Link href={`/profile/${artist.name}/`}>
            <a style={{ textDecoration: "none", color: "#fff" }}>Posts</a>
          </Link>
        </Button>
        <span className={styles.separator}>|</span>

        <Button className={styles.button}>
          <Link href={`/profile/${artist.name}/liked`}>
            <a style={{ textDecoration: "none", color: "#fff" }}>Liked Posts</a>
          </Link>
        </Button>
      </Box>
      {children}
    </Box>
  );
};

export default RightInfo;
