import styles from "../../../pages/styles/Specific/Commission.module.css";
import {
  Container,
  Typography,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../../../Hooks/usePagination";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicDialog = dynamic(() => import("../DeleteDialog"));

const CommissionList = ({ fetchMore, commissions }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetId, settargetId] = useState("");
  const { More, hasMore, ref } = usePagination({
    key: "userId",
    fetchMore,
    info: commissions,
    limit: 4,
    key2: "commissions",
    executeWhileUnscrollable: true,
  });
  const handleDeleteOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    settargetId(e.currentTarget.id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    settargetId("");
    setDeleteOpen(false);
  };
  return (
    <>
      <Container ref={ref} id="commList">
        <List>
          <InfiniteScroll
            dataLength={commissions.edges.length}
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
            scrollThreshold={0.9}
            scrollableTarget="commList"
          >
            {commissions &&
              commissions.edges.map((commission) => (
                <Link
                  href={`/commissions/${commission.node.id}`}
                  passHref
                  key={commission.node.id}
                >
                  <ListItem
                    divider
                    key={commission.node.id}
                    button
                    component="a"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <ListItemAvatar>
                      <Image
                        src={
                          commission.node.fromUser.image
                            ? commission.node.fromUser.image
                            : "/user-empty-avatar.png"
                        }
                        width={40}
                        height={40}
                        className={styles.avatar}
                        alt={"Commissioner Image"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={commission.node.title}
                      secondary={`Issued ${commission.node.dateIssued} `}
                      style={{ wordWrap: "break-word" }}
                    />

                    <Typography  sx={{marginRight: "16px"}}>
                      Deadline:
                      {commission.node.deadline
                        ? commission.node.deadline
                        : "No Deadline"}
                    </Typography>

                    <ListItemSecondaryAction>
                      <IconButton
                        id={commission.node.id}
                        onClick={handleDeleteOpen}
                        size="large"
                      >
                        <CloseIcon color="secondary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              ))}
          </InfiniteScroll>
        </List>
      </Container>
      <DynamicDialog
        open={deleteOpen}
        handleClose={handleDeleteClose}
        id={targetId}
      />
    </>
  );
};

export default CommissionList;
