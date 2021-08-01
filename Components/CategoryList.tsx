import styles from "../pages/styles/General/Trending.module.css";
import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Link from "next/link";
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

const CategoryList = ({ data, first, fetchMore, second }: Props) => {
  const [open, setOpen] = useState(false);
  const [targetArt, settargetArt] = useState("");
  const key2exist = second && second != "" ? second : null;
  const { More, hasMore } = usePagination({
    key: first,
    fetchMore,
    info: data,
    limit: 4,
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
        scrollThreshold={0.8}
      >
        <GridList cellHeight="auto" spacing={2}>
          {data?.edges.map((tile) => (
            <GridListTile key={tile.node.art} className={styles.listTile}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleOpen}
                id={tile.node.watermarkArt}
              >
                <Image
                  src={tile.node.watermarkArt}
                  width={tile.node.width}
                  height={tile.node.height}
                  alt={"Art Image"}
                />
              </Box>
              <GridListTileBar
                title={`${tile.node.title} ${
                  tile.node.author ? ` by ${tile.node.author.name}` : ""
                }`}
                titlePosition="top"
                className={styles.titleBar}
                actionIcon={
                  <Link href={`/posts/${tile.node.id}`} passHref>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                }
                actionPosition="right"
              />
            </GridListTile>
          ))}
        </GridList>
      </InfiniteScroll>

      <DynamicImage handleClose={handleClose} open={open} art={targetArt} />
    </div>
  );
};

export default CategoryList;
