import { Drawer, List } from "@material-ui/core";
import DrawerItems from "../../ListItems/Drawer";
import styles from "../../../pages/styles/Specific/Appbar.module.css";

type Props = {
  open: boolean;
  handleDrawer: () => void;
};

const Normal = ({ open, handleDrawer }: Props) => {
  return (
    <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
      <List className={styles.list}>
        <DrawerItems /> {/* Drawer List */}
      </List>
    </Drawer>
  );
};

export default Normal;
