import {
  ListItem,
  Button,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { DELETE_HISTORY_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
    item: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
    },
  })
);

const HistoryEditMenu = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const classes = useStyles();
  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION);

  const DeleteHistory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteHistory({
      variables: { historyID: id },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `History:${id}` });
        cache.gc();
        onClose();
      },
    });
  };

  return (
    <div>
      <ListItem>
        <Button className={classes.item} onClick={DeleteHistory}>
          <InfoIcon className={classes.icon} /> Delete History
        </Button>
      </ListItem>
    </div>
  );
};

export default HistoryEditMenu;
