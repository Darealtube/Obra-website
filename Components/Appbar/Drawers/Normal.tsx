import { Drawer, List } from "@material-ui/core";
import DrawerItems from "../../ListItems/Drawer";
import styles from "../../../pages/styles/Specific/Appbar.module.css";

type Props = {
    open:boolean;
    handleDrawer: () => void;
}

const Normal = ({open, handleDrawer}: Props) => {
  return (
    <Drawer anchor={"left"} open={open} onClose={handleDrawer}>
      <List className={styles.list}>
        <DrawerItems /> {/* Manage this later */}
      </List>
    </Drawer>
  );
};

export default Normal;
