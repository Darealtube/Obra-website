import styles from "../pages/styles/General/Trending.module.css";
import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Link from "next/link";

const DynamicImage = dynamic(
  () => import("../Components/PostInfo/ImageDialog")
);

const Gridlist = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [targetArt, settargetArt] = useState("");

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
      <GridList cellHeight="auto" spacing={2}>
        {data.map((tile) => (
          <GridListTile key={tile.node.art} className={styles.listTile}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={handleOpen}
              id={tile.node.art}
            >
              <Image
                src={tile.node.art}
                width={tile.node.width}
                height={tile.node.height}
              />
            </Box>
            <GridListTileBar
              title={`${tile.node.title} by ${tile.node.author.name}`}
              titlePosition="top"
              className={styles.titleBar}
              actionIcon={
                <Link href={`/${tile.node.id}`}>
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

      <DynamicImage handleClose={handleClose} open={open} art={targetArt} />
    </div>
  );
};

export default Gridlist;
