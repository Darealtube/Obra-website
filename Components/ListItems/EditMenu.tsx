import Link from "next/link";
import { ListItem, Divider, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { DELETE_POST_MUTATION } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import styles from "../../pages/styles/Specific/Lists.module.css";

type Props = {
  id: string;
  admin: boolean;
  onClose: () => void;
  onExited: () => void;
};

const EditMenu = ({ id, admin, onClose, onExited }: Props) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const DeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost({
      variables: { postId: id },
      optimisticResponse: true,
      update: (cache) => {
        cache.evict({ id: `Post:${id}` });
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
            <Link href={`/${id}/edit`}>
              <Button className={styles.item} component="a">
                <MeetingRoomIcon className={styles.icon} /> Edit
              </Button>
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Button className={styles.item} onClick={DeletePost}>
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

export default EditMenu;
