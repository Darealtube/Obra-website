import {
  List,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import styles from "../../../pages/styles/General/Issues.module.css";
import usePagination from "../../../Hooks/usePagination";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@material-ui/core";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicDeleteDialog = dynamic(() => import("../DeleteDialog"));

const BugReportList = ({ reports, fetchMore }) => {
  const mobile = useMediaQuery("(max-width: 1020px)");
  const mobileDiv = useMediaQuery("(max-width: 586px)");
  const [targetId, setTargetId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { More, ref, hasMore } = usePagination(
    "reports",
    fetchMore,
    reports,
    4,
    null,
    true
  );

  const handleClose = () => {
    setDeleteDialog(false);
    setTargetId(null);
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDeleteDialog(true);
    setTargetId(e.currentTarget.value);
  };

  return (
    <div className={styles.reportList} ref={ref} id="pendingList">
      <List>
        <InfiniteScroll
          dataLength={reports.edges.length}
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
          scrollableTarget="pendingList"
        >
          {reports &&
            reports.edges.map((report) => (
              <ListItem
                divider
                key={report.node.id}
                component="a"
                ContainerComponent="div"
              >
                <ListItemAvatar>
                  <Image
                    src={
                      report.node.senderId.image
                        ? report.node.senderId.image
                        : "/user-empty-avatar.png"
                    }
                    width={40}
                    height={40}
                    className={styles.avatar}
                    alt={"Report Sender Image"}
                  />
                </ListItemAvatar>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection={mobileDiv ? "column" : "row"}
                  width="100%"
                >
                  <Box width={mobileDiv ? "100%" : "70%"} flexGrow={1}>
                    <ListItemText
                      primary={`${report.node.reason} Report issued by ${
                        report.node.senderId.name
                      } at ${moment(report.node.date).format("l")}`}
                      secondary={`${report.node.description}`}
                      style={{ wordBreak: "break-word" }}
                    />
                  </Box>

                  <Box
                    style={
                      mobile && !mobileDiv
                        ? {
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "30%",
                          }
                        : { display: "block" }
                    }
                  >
                    <Link href={`/issues/${report.node.id}`} passHref>
                      <Button component="a">View</Button>
                    </Link>
                    <IconButton value={report.node.id} onClick={handleOpen}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
        </InfiniteScroll>
      </List>
      <DynamicDeleteDialog
        handleClose={handleClose}
        open={deleteDialog}
        targetId={targetId}
      />
    </div>
  );
};

export default BugReportList;