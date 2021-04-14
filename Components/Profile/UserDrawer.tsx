import { Typography, Container, Box, Dialog } from "@material-ui/core";
import Image from "next/image";
import styles from "../../pages/styles/Specific/Profile.module.css";
import CakeIcon from "@material-ui/icons/Cake";
import FlagIcon from "@material-ui/icons/Flag";
import BrushIcon from "@material-ui/icons/Brush";
import PersonIcon from "@material-ui/icons/Person";
import PaletteIcon from "@material-ui/icons/Palette";

const UserDrawer = ({ artist, setOpen, open }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={styles.dialog}
        fullWidth
        maxWidth={"sm"}
      >
        <Container style={{ flexGrow: 1 }} className={styles.container}>
          {artist ? (
            <Box className={styles.dp}>
              <Image
                src={artist.image ? artist.image : "/user-empty-avatar.png"}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          ) : (
            ""
          )}
          <br />
          <Typography variant="h4">{artist.name}</Typography>
          <br />
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <CakeIcon className={styles.icon} /> Born in {artist.birthday}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <FlagIcon className={styles.icon} /> Lives in {artist.country}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <PersonIcon className={styles.icon} /> {artist.artLevel}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <PaletteIcon className={styles.icon} /> Specializes in &nbsp;
            {artist.artStyles.join(", ").toString()}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={styles.text}
            gutterBottom
          >
            <BrushIcon className={styles.icon} /> Does &nbsp;
            {artist.artKinds.join(", ").toString()}
          </Typography>
        </Container>
      </Dialog>
    </div>
  );
};

export default UserDrawer;
