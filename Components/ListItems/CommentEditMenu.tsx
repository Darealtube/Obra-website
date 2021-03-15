import { useRouter } from "next/router";
import {
  ListItem,
  Divider,
  Button,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { DELETE_COMMENT_MUTATION } from "../../apollo/apolloQueries";
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

const CommentEditMenu = ({
  id,
  admin,
  onClose,
  onExited,
}: {
  id: string;
  admin: boolean;
  onClose: () => void;
  onExited: () => void;
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);

  const DeleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteComment({
      variables: { commentID: id },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Comment:${id}` });
        cache.gc();
        onClose();
        onExited();
      },
    });
  };

  return (
    <div>
      {admin && (
        <>
          <ListItem>
            <Button
              className={classes.item}
              onClick={() => router.push(`/${id}/edit`)}
            >
              <MeetingRoomIcon className={classes.icon} /> Edit
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <Button className={classes.item} onClick={DeleteComment}>
              <InfoIcon className={classes.icon} /> Delete
            </Button>
          </ListItem>
          <Divider />
        </>
      )}
      <ListItem>
        <Button className={classes.item}>
          <ContactSupportIcon className={classes.icon} /> Report
        </Button>
      </ListItem>
    </div>
  );
};

export default CommentEditMenu;
