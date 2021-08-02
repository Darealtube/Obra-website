import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
  IconButton,
  ListItemSecondaryAction,
  useMediaQuery,
} from "@material-ui/core";
import Image from "next/image";
import styles from "../../../pages/styles/Specific/Commission.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../../../Hooks/usePagination";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Commissions } from "../../../interfaces/UserInterface";

const DynamicDialog = dynamic(() => import("../ConfirmDialog"));
const AcceptDialog = dynamic(() => import("../AcceptDialog"));

type Props = {
  pendingCommissions: Commissions;
  fetchMore: any;
};

const PendingList = ({ pendingCommissions, fetchMore }: Props) => {
  const mobile = useMediaQuery("(max-width: 1020px)");
  const [open, setOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [targetId, settargetId] = useState("");
  const { More, hasMore, ref } = usePagination({
    key: "userId",
    fetchMore,
    info: pendingCommissions,
    limit: 4,
    key2: "pendingCommissions",
    executeWhileUnscrollable: true,
  });

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    settargetId(e.currentTarget.id);
    setOpen(true);
  };

  const handleClose = () => {
    settargetId("");
    setOpen(false);
  };

  const handleAcceptOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    settargetId(e.currentTarget.id);
    setAcceptOpen(true);
  };

  const handleAcceptClose = () => {
    settargetId("");
    setAcceptOpen(false);
  };

  return <>
    <div className={styles.list2} ref={ref} id="pendingList">
      <List>
        <InfiniteScroll
          dataLength={pendingCommissions.edges.length}
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
          {pendingCommissions &&
            pendingCommissions.edges.map((commission) => (
              <Link
                href={`/commissions/${commission.node.id}`}
                key={commission.node.id}
                passHref
              >
                <ListItem
                  divider
                  key={commission.node.id}
                  component="a"
                  ContainerComponent="div"
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
                    primary={`${commission.node.title}  issued by ${commission.node.fromUser.name} at ${commission.node.dateIssued}`}
                    secondary={
                      mobile
                        ? `${commission.node.description}. 
                              ${
                                commission.node.deadline
                                  ? `Deadline: ${commission.node.deadline}`
                                  : `No Deadline`
                              }`
                        : `${commission.node.description}`
                    }
                    style={{ flexGrow: 1 }}
                  />

                  <ListItemSecondaryAction
                    style={
                      mobile
                        ? {
                            display: "flex",
                            flexDirection: "column",
                          }
                        : { display: "block" }
                    }
                  >
                    {!mobile && (
                      <Typography>
                        Deadline:{" "}
                        {commission.node.deadline
                          ? commission.node.deadline
                          : "No Deadline"}
                      </Typography>
                    )}
                    <IconButton id={commission.node.id} onClick={handleAcceptOpen} size="large">
                      <CheckIcon style={{ color: "green" }} />
                    </IconButton>
                    <IconButton id={commission.node.id} onClick={handleOpen} size="large">
                      <CloseIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            ))}
        </InfiniteScroll>
      </List>
    </div>
    <DynamicDialog open={open} handleClose={handleClose} id={targetId} />
    <AcceptDialog
      open={acceptOpen}
      handleClose={handleAcceptClose}
      id={targetId}
    />
  </>;
};

export default PendingList;
