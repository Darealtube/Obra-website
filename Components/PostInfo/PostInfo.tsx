import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Post.module.css";
import React, { useState } from "react";
import { PostInterface } from "../../interfaces/PostInterface";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import {
  ADD_CART_MUTATION,
  LIKE_UNLIKE_MUTATION,
  UNADD_TO_CART_MUTATION,
} from "../../apollo/apolloQueries";
import {
  addUnaddToCartVars,
  LikeUnlikeData,
  UnlikeLikeVars,
} from "../../interfaces/MutationInterfaces";
import Image from "next/image";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ReportIcon from "@material-ui/icons/Report";
import PersonIcon from "@material-ui/icons/Person";
import dynamic from "next/dynamic";
import Link from "next/link";

type Parameters = {
  postID: PostInterface;
  alreadyLiked: boolean;
  alreadyAdded: boolean;
  handleOpenDialog: () => void;
  handleDeleteDialog: () => void;
};

const DynamicInfoDialog = dynamic(() => import("./PostDialogs/InfoDialog"));

const PostInfo = ({
  postID,
  alreadyLiked,
  alreadyAdded,
  handleOpenDialog,
  handleDeleteDialog,
}: Parameters) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cartDisabled, setCartDisabled] = useState(false);
  const [liked, setLiked] = useState(alreadyLiked);
  const [added, setAdded] = useState(alreadyAdded);
  const [session, loading] = useSession();
  const [addtoCart] = useMutation<boolean, addUnaddToCartVars>(
    ADD_CART_MUTATION
  );
  const [removeFromCart] = useMutation<boolean, addUnaddToCartVars>(
    UNADD_TO_CART_MUTATION
  );
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

  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!added) {
      setAdded(true);
      setCartDisabled(true);
      addtoCart({
        variables: {
          postID: postID.id,
          userID: session?.id,
          cost: +postID.price,
        },
        update: () => {
          setCartDisabled(false);
        },
      });
    } else {
      setAdded(false);
      setCartDisabled(true);
      removeFromCart({
        variables: { postID: postID.id, userID: session?.id },
        update: () => {
          setCartDisabled(false);
        },
      });
    }
  };

  const handleInfoDialog = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <>
      <ImageListItem>
        <Box className={styles.artContainer}>
          <Image
            src={postID.watermarkArt}
            layout="fill"
            objectFit="contain"
            onClick={handleOpenDialog}
            alt={"Art Image"}
          />
        </Box>
        <ImageListItemBar
          title={<Typography>{postID.title}</Typography>}
          subtitle={postID.description}
          actionIcon={
            <>
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                size="medium"
                onClick={handleInfoDialog}
              >
                <InfoIcon />
              </IconButton>
              {session && !loading && (
                <>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    size="medium"
                    onClick={handleLike}
                    disabled={disabled}
                  >
                    {liked ? (
                      <FavoriteIcon color="secondary" />
                    ) : (
                      <FavoriteBorderIcon color="inherit" />
                    )}
                  </IconButton>
                  {postID.sale == "Yes" && postID.author.id != session?.id && (
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      size="medium"
                      onClick={handleCart}
                      disabled={cartDisabled}
                    >
                      <AddShoppingCartIcon
                        color={added ? "secondary" : "inherit"}
                      />
                    </IconButton>
                  )}
                </>
              )}
            </>
          }
        />
      </ImageListItem>

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
            {postID.author.id != session?.id ? (
              <>
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
                <Link href={`/report/post/${postID.id}`} passHref>
                  <Button
                    variant="outlined"
                    component="a"
                    className={styles.userInfoButtons}
                    startIcon={<ReportIcon />}
                  >
                    Report Post
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/post/${postID.id}/edit`} passHref>
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

      <DynamicInfoDialog
        post={postID}
        handleClose={handleInfoDialog}
        open={openInfo}
      />
    </>
  );
};

export default PostInfo;
