import { List, SwipeableDrawer } from "@material-ui/core";
import DrawerItems from "../../ListItems/Drawer";
import styles from "../../../pages/styles/Specific/Appbar.module.css";

type Props = {
  open: boolean;
  handleDrawer: () => void;
};

const Swipeable = ({ open, handleDrawer }: Props) => {
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={handleDrawer}
      onOpen={handleDrawer}
    >
      <List className={styles.list}>
        <DrawerItems /> {/* Drawer List */}
      </List>
    </SwipeableDrawer>
  );
};

export default Swipeable;
