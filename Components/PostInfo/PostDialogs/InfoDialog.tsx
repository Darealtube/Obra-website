import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { PostInterface } from "../../../interfaces/PostInterface";

type Props = {
  handleClose: () => void;
  open: boolean;
  post: PostInterface;
};

const InfoDialog = ({ handleClose, open, post }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography gutterBottom variant="h4">
          {post.title}{" "}
          <Typography variant="h5">by {post.author.name}</Typography>
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography gutterBottom variant="h6">
          Description: {post.description}
        </Typography>
        <Typography gutterBottom variant="h6">
          Created: {post.date}
        </Typography>
        <Typography gutterBottom variant="h6">
          {post.likes} like(s)
        </Typography>
        <Typography gutterBottom variant="body1">
          Category/Tags:
          {post.tags
            .map((tag) => tag.name)
            .join(", ")
            .toString()}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
