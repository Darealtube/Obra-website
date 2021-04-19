import { Container, Dialog, IconButton } from "@material-ui/core";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Post.module.css";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { PostInterface } from "../../interfaces/PostInterface";

type Props = {
  handleClose: () => void;
  open: boolean;
  postId: PostInterface;
};

const ImageDialog = ({ handleClose, open, postId }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles.dialog}
      fullWidth
      maxWidth={"xl"}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Container className={styles.container}>
        <IconButton
          onClick={handleClose}
          className={styles.exit}
          edge="start"
          size="medium"
          color="inherit"
        >
          <FullscreenExitIcon style={{ color: "white" }} />
        </IconButton>
        <Image src={postId.art} layout="fill" objectFit="contain" />
      </Container>
    </Dialog>
  );
};

export default ImageDialog;
