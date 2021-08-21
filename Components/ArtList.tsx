import styles from "../pages/styles/General/Trending.module.css";
import {
  ImageList,
  ImageListItem,
  CircularProgress,
  Box,
  Button,
  Grow,
  ImageListItemBar,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../Hooks/usePagination";
import { Posts } from "../interfaces/UserInterface";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Link from "next/link";

const DynamicImage = dynamic(
  () => import("./PostInfo/PostDialogs/ImageDialog")
);

type Props = {
  data: Posts;
  first?: string;
  fetchMore: any;
  second?: string;
  columns?: number;
};

const ArtList = ({
  data,
  first,
  fetchMore,
  second = null,
  columns = null,
}: Props) => {
  const xs = useMediaQuery("(max-width: 570px)");
  const sm = useMediaQuery("(max-width: 960px)");
  const [open, setOpen] = useState(false);
  const [targetArt, settargetArt] = useState("");
  const { More, hasMore } = usePagination({
    key: first,
    fetchMore,
    info: data,
    limit: 20,
    key2: second,
  });

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    settargetArt(e.currentTarget.id);
  };

  const handleClose = () => {
    setOpen(false);
    settargetArt("");
  };

  return (
    <div className={styles.listRoot}>
      <InfiniteScroll
        dataLength={data?.edges.length}
        next={More}
        hasMore={hasMore}
        loader={
          <>
            <br />
            <CircularProgress />
          </>
        }
        style={{
          overflow: "hidden",
          textAlign: "center",
        }}
        scrollThreshold={0.4}
      >
        <ImageList
          variant="masonry"
          cols={columns ? columns : xs ? 1 : sm ? 2 : 3}
          gap={8}
        >
          {data?.edges.map((tile) => (
            <div key={tile.node.watermarkArt}>
              <Grow in={true} timeout={2000}>
                <ImageListItem>
                  <Box
                    onClick={handleOpen}
                    component={Button}
                    disableRipple
                    disableFocusRipple
                    id={tile.node.watermarkArt}
                  >
                    <Image
                      src={tile.node.watermarkArt}
                      width={tile.node.width}
                      height={tile.node.height}
                      alt={"Art Image"}
                    />
                  </Box>
                  <Box textAlign="center">
                    <ImageListItemBar
                      position="below"
                      title={<Typography>{tile.node.title}</Typography>}
                      actionIcon={
                        <Link href={`/posts/${tile.node.id}/`} passHref>
                          <IconButton
                            component="a"
                            size="large"
                            sx={{ position: "relative", bottom: "4px" }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      }
                    />
                  </Box>
                </ImageListItem>
              </Grow>
            </div>
          ))}
        </ImageList>
      </InfiniteScroll>

      <DynamicImage handleClose={handleClose} open={open} art={targetArt} />
    </div>
  );
};

export default ArtList;
