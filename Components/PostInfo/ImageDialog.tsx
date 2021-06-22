import { Container, Dialog, IconButton } from "@material-ui/core";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Post.module.css";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

type Props = {
  handleClose: () => void;
  open: boolean;
  art: string;
};

const ImageDialog = ({ handleClose, open, art }: Props) => {
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
        {art != "" && <Image src={art} layout="fill" objectFit="contain" alt={"Art Image"} />}
      </Container>
    </Dialog>
  );
};

export default ImageDialog;
