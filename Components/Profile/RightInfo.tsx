import { Box, Button } from "@material-ui/core";
import styles from "../../pages/styles/Specific/Profile.module.css";
import Link from "next/link";
import { UserInterface } from "../../interfaces/UserInterface";

type Props = {
  children: React.ReactNode;
  artist: UserInterface;
};

const RightInfo = ({ children, artist }: Props) => {
  return (
    <Box className={styles.postContainer}>
      {artist && (
        <Box justifyContent="center" alignItems="center" marginBottom={8}>
          <Button className={styles.button}>
            <Link href={`/profile/${artist.name}/`}>
              <a style={{ textDecoration: "none", color: "#fff" }}>Posts</a>
            </Link>
          </Button>
          <span className={styles.separator}>|</span>

          <Button className={styles.button}>
            <Link href={`/profile/${artist.name}/liked`}>
              <a style={{ textDecoration: "none", color: "#fff" }}>
                Liked Posts
              </a>
            </Link>
          </Button>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default RightInfo;
