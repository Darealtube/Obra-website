import {
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Post.module.css";
import { useContext, useState } from "react";
import { PostInterface } from "../../interfaces/PostInterface";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import {
  LikeUnlikeData,
  UnlikeLikeVars,
} from "../../interfaces/MutationInterfaces";
import Image from "next/image";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LIKE_UNLIKE_MUTATION } from "../../apollo/Mutations/postMutations";
import CommentIcon from "@material-ui/icons/Comment";
import Comments from "./Comments";
import { AppContext } from "../Appbar/AppWrap";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

type Parameters = {
  postID: PostInterface;
  alreadyLiked: boolean;
  handleOpenDialog: () => void;
  handleDeleteDialog: () => void;
  fetchComments: any;
};

const DynamicCommentDrawer = dynamic(() => import("./CommentDrawer"));
const DynamicInfoDialog = dynamic(() => import("./PostDialogs/InfoDialog"));

const PostInfo = ({
  postID,
  alreadyLiked,
  handleOpenDialog,
  handleDeleteDialog,
  fetchComments,
}: Parameters) => {
  const theme = useTheme();
  const [session] = useSession();
  const postAdmin = postID.author.id == session?.id;
  const drawerOpen = useContext(AppContext);
  const commentToggle =
    useMediaQuery(theme.breakpoints.down("lg")) || drawerOpen;
  const [openComment, setOpenComment] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [liked, setLiked] = useState(alreadyLiked);

  const [like] = useMutation<LikeUnlikeData, UnlikeLikeVars>(
    LIKE_UNLIKE_MUTATION
  );

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!liked) {
      setLiked(true);
      setDisabled(true);
      like({
        variables: { postId: postID.id, userID: session?.id, action: "like" },
        update: () => {
          setDisabled(false);
        },
      });
    } else {
      setLiked(false);
      setDisabled(true);
      like({
        variables: { postId: postID.id, userID: session?.id, action: "unlike" },
        update: () => {
          setDisabled(false);
        },
      });
    }
  };

  const handleInfoDialog = () => {
    setOpenInfo(!openInfo);
  };

  const handleDrawer = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      <Box
        sx={{
          background: `url(${postID.watermarkArt}) no-repeat`,
          backgroundSize: "cover",
          height: "40vh",
          width: "100%",
        }}
      >
        <Box className={styles.artContainer}>
          <Image
            src={postID.watermarkArt}
            layout="fill"
            objectFit="contain"
            onClick={handleOpenDialog}
            alt={"Art Image"}
          />
        </Box>
      </Box>

      <Box marginTop={2} className={styles.postOptions}>
        <Box flexGrow={1}>
          <Typography variant="h4">{postID.title}</Typography>
          <Typography>{postID.description}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handleInfoDialog}>
            <InfoIcon />
          </IconButton>
          {!postAdmin && (
            <IconButton onClick={handleLike} disabled={disabled}>
              {liked ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon color="inherit" />
              )}
            </IconButton>
          )}
          {commentToggle && (
            <Badge badgeContent={postID.comments.totalCount} color="secondary">
              <IconButton onClick={handleDrawer}>
                <CommentIcon />
              </IconButton>
            </Badge>
          )}
          <Link href={`/report/post/${postID.id}`} passHref>
            <IconButton component="a">
              <PriorityHighIcon />
            </IconButton>
          </Link>
        </Box>
      </Box>

      <Box display="flex" marginTop={2} alignItems="center">
        <Image
          src={postID.author.image}
          width={80}
          height={80}
          className={styles.avatar}
          alt={"User Avatar"}
        />
        <Box className={styles.userInfo}>
          <Box style={{ flexGrow: 1 }}>
            <Typography variant="h4">{postID.author.name}</Typography>
            <Typography>Created {postID.author.artCount} art(s)</Typography>
          </Box>
          <Box className={styles.userInfoOptions}>
            {!postAdmin ? (
              <Link href={`/profile/${postID.author.name}/`} passHref>
                <Button
                  variant="outlined"
                  component="a"
                  className={styles.userInfoButtons}
                  startIcon={<PersonIcon />}
                >
                  View Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link href={`/posts/${postID.id}/edit`} passHref>
                  <Button
                    variant="outlined"
                    component="a"
                    color="success"
                    className={styles.userInfoButtons}
                  >
                    Edit Post
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  component="a"
                  color="secondary"
                  className={styles.userInfoButtons}
                  onClick={handleDeleteDialog}
                >
                  Delete Post
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {!commentToggle && <Comments fetchMore={fetchComments} postID={postID} />}

      <DynamicInfoDialog
        post={postID}
        handleClose={handleInfoDialog}
        open={openInfo}
      />
      <DynamicCommentDrawer
        id={postID.id}
        comments={postID.comments}
        fetchMore={fetchComments}
        handleDrawer={handleDrawer}
        open={openComment}
      />
    </>
  );
};

export default PostInfo;
