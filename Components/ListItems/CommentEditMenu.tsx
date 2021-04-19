import { useRouter } from "next/router";
import {
  ListItem,
  Divider,
  Button,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { DELETE_COMMENT_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import styles from "../../pages/styles/Specific/Lists.module.css";

type Props = {
  id: string;
  admin: boolean;
  onClose: () => void;
  onExited: () => void;
}

const CommentEditMenu = ({
  id,
  admin,
  onClose,
  onExited,
}: Props) => {
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
              className={styles.item}
              onClick={() => router.push(`/${id}/edit`)}
            >
              <MeetingRoomIcon className={styles.icon} /> Edit
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <Button className={styles.item} onClick={DeleteComment}>
              <InfoIcon className={styles.icon} /> Delete
            </Button>
          </ListItem>
          <Divider />
        </>
      )}
      <ListItem>
        <Button className={styles.item}>
          <ContactSupportIcon className={styles.icon} /> Report
        </Button>
      </ListItem>
    </div>
  );
};

export default CommentEditMenu;
