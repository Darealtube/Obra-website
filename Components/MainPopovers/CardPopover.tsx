import { Popover, List } from "@material-ui/core";
import EditMenu from "../../Components/ListItems/EditMenu";

type Props = {
  editAnchor: HTMLElement;
  handleEditClose: () => void;
  handleEditExit: () => void;
  admin: boolean;
  targetId: string;
};

const CardPopover = ({
  editAnchor,
  handleEditClose,
  handleEditExit,
  admin,
  targetId,
}: Props) => {
  return (
    <Popover
      anchorEl={editAnchor}
      keepMounted
      open={Boolean(editAnchor)}
      onClose={handleEditClose}
      onExited={handleEditExit}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <List>
        <EditMenu
          id={targetId}
          admin={admin}
          onClose={handleEditClose}
          onExited={handleEditExit}
        />
      </List>
    </Popover>
  );
};

export default CardPopover;
