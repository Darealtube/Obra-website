import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
  Container,
  Divider,
} from "@material-ui/core";
import Image from "next/image";
import moment from "moment";
import styles from "../../../pages/styles/Specific/Commission.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../../../Hooks/usePagination";
import Link from "next/link";
import { Commissions } from "../../../interfaces/UserInterface";

type Props = {
  commissions: Commissions;
  fetchMore: any;
};

const CommList = ({ commissions, fetchMore }: Props) => {
  const { More, hasMore, ref } = usePagination(
    "userId",
    fetchMore,
    commissions,
    "commissions",
    true
  );

  return (
    <>
      <Container className={styles.list} ref={ref} id="commList">
        <Typography variant="h4">Commissions to do</Typography>
        <Divider />
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
                <Link href={`/commissions/${commission.node.id}`}>
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
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={commission.node.title}
                      secondary={`Issued ${moment(
                        commission.node.dateIssued
                      ).format("l")}`}
                      style={{ flexGrow: 1, wordWrap: "break-word" }}
                    />
                    <Typography>
                      Deadline: {moment(commission.node.deadline).format("l")}{" "}
                    </Typography>
                  </ListItem>
                </Link>
              ))}
          </InfiniteScroll>
        </List>
      </Container>
    </>
  );
};

export default CommList;
