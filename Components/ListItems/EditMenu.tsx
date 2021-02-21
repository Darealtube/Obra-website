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
import { DELETE_POST_MUTATION, POST_QUERY } from "../../apollo/apolloQueries";
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

const EditMenu = ({
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
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const DeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost({
      variables: { postId: id },
      optimisticResponse: true,
      update: (cache) => {
        const existingPosts: any = cache.readQuery({ query: POST_QUERY });
        const newPosts = existingPosts.posts.filter((p) => p.id !== id);

        cache.writeQuery({
          query: POST_QUERY,
          data: { posts: newPosts },
        });
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
            <Button className={classes.item} onClick={DeletePost}>
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

export default EditMenu;
