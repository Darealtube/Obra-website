import Link from "next/link";
import { ListItem, Divider, Button, List } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useMutation } from "@apollo/client";
import styles from "../../pages/styles/Specific/Lists.module.css";
import { DELETE_COMMENT_MUTATION } from "../../apollo/Mutations/commentMutations";

type Props = {
  id: string;
  admin: boolean;
  onClose: () => void;
  onExited: () => void;
};

const CommentEditMenu = ({ id, admin, onClose, onExited }: Props) => {
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
    <>
      <List>
        {admin && (
          <>
            <ListItem>
              <Link href={`/${id}/edit`} passHref>
                <Button component="a" className={styles.item}>
                  <MeetingRoomIcon className={styles.icon} /> Edit
                </Button>
              </Link>
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
          <Link href={`/report/comment/${id}`} passHref>
            <Button className={styles.item} component="a">
              <ContactSupportIcon className={styles.icon} /> Report
            </Button>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default CommentEditMenu;
