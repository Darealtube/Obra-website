import styles from "../pages/styles/General/Trending.module.css";
import {
  ImageList,
  ImageListItem,
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../Hooks/usePagination";
import { Posts } from "../interfaces/UserInterface";

const DynamicImage = dynamic(
  () => import("../Components/PostInfo/ImageDialog")
);

type Props = {
  data: Posts;
  first?: string;
  fetchMore: any;
  second?: string;
};

const Gridlist = ({ data, first, fetchMore, second }: Props) => {
  const [open, setOpen] = useState(false);
  const [targetArt, settargetArt] = useState("");
  const key2exist = second && second != "" ? second : null;
  const { More, hasMore } = usePagination({
    key: first,
    fetchMore,
    info: data,
    limit: 12,
    key2: key2exist,
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
        <ImageList variant="masonry" cols={3} gap={8}>
          {data?.edges.map((tile) => (
            <ImageListItem key={tile.node.watermarkArt}>
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
            </ImageListItem>
          ))}
        </ImageList>
      </InfiniteScroll>

      <DynamicImage handleClose={handleClose} open={open} art={targetArt} />
    </div>
  );
};

export default Gridlist;
