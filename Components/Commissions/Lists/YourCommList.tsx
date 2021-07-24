import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import Image from "next/image";
import styles from "../../../pages/styles/Specific/Commission.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "../../../Hooks/usePagination";
import Link from "next/link";
import { Commissions } from "../../../interfaces/UserInterface";

type Props = {
  yourCommissions: Commissions;
  fetchMore: any;
};

const YourCommList = ({ yourCommissions, fetchMore }: Props) => {
  const mobile = useMediaQuery("(max-width: 768px)");
  const { More, hasMore, ref } = usePagination({
    key: "userId",
    fetchMore,
    info: yourCommissions,
    limit: 4,
    key2: "yourCommissions",
    executeWhileUnscrollable: true,
  });
  return (
    <>
      <div className={styles.list2} ref={ref} id="pendingList">
        <List>
          <InfiniteScroll
            dataLength={yourCommissions.edges.length}
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
            {yourCommissions &&
              yourCommissions.edges.map((commission) => (
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
                    {!mobile && (
                      <Typography>
                        Deadline:{" "}
                        {commission.node.deadline
                          ? commission.node.deadline
                          : "No Deadline"}
                      </Typography>
                    )}
                  </ListItem>
                </Link>
              ))}
          </InfiniteScroll>
        </List>
      </div>
    </>
  );
};

export default YourCommList;
