import {
  List,
  ListItem,
  ListItemAvatar,
  Box,
  CssBaseline,
  CircularProgress,
  useMediaQuery,
  Checkbox,
  IconButton,
  ListItemText,
} from "@material-ui/core";
import styles from "../styles/General/Cart.module.css";
import Head from "next/head";
import CartWrap from "../../Components/Cart/CartWrap";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../apollo/apolloClient";
import { fetchFinishedComms } from "../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { YOUR_FINISHED_COMMS_QUERY } from "../../apollo/apolloQueries";
import { QueryIdVars, UserIdData } from "../../interfaces/QueryInterfaces";
import Image from "next/image";
import Appbar from "../../Components/Appbar/Appbar";
import usePagination from "../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useState } from "react";
import Link from "next/link";

const FinishedCommissionCart = ({ id }: {id: string;}) => {
  const LaptopL = useMediaQuery("(max-width: 1236px)");
  const Small = useMediaQuery("(max-width: 959px)");
  const [selected, setSelected] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: { userId },
    fetchMore,
  } = useQuery<UserIdData, QueryIdVars>(YOUR_FINISHED_COMMS_QUERY, {
    variables: {
      limit: 4,
      id: id,
    },
  });

  const { More, hasMore, ref } = usePagination({
    key: "userId",
    fetchMore,
    info: userId.yourFinishedCommissions,
    limit: 4,
    key2: "yourFinishedCommissions",
    executeWhileUnscrollable: true,
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(e.target.id);
      setTotalPrice(+e.target.value);
    } else if (!e.target.checked) {
      setSelected("");
      setTotalPrice(0);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Finished Commissions</title>
      </Head>
      <Appbar />
      <CssBaseline />
      <CartWrap totalPrice={totalPrice}>
        <List className={styles.artCart} id="artCart" ref={ref}>
          <InfiniteScroll
            dataLength={userId.yourFinishedCommissions.edges.length}
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
            scrollThreshold={0.6}
            scrollableTarget="artCart"
          >
            {userId.yourFinishedCommissions.edges.map((item) => (
              <>
                <ListItem key={item.node.id} style={{ display: "flex" }}>
                  <Box>
                    <ListItemAvatar>
                      <Image
                        src={item.node.finishedwatermarkArt}
                        width={400}
                        height={200}
                        className={styles.avatar}
                        alt={"Author Image"}
                      />
                    </ListItemAvatar>
                  </Box>

                  <ListItemText
                    style={{
                      marginLeft: "12px",
                      flexGrow: 1,
                    }}
                    primary={item.node.title}
                    secondary={<>{item.node.message}</>}
                  />

                  <Box
                    className={styles.cartActions}
                    style={
                      LaptopL && !Small
                        ? { flexDirection: "column" }
                        : { flexDirection: "row" }
                    }
                  >
                    <Link href={`/commissions/${item.node.id}`} passHref>
                      <IconButton component="a">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                    <Checkbox
                      color="primary"
                      id={item.node.id}
                      value={item.node.price}
                      onChange={handleSelect}
                      checked={selected == item.node.id}
                    />
                  </Box>
                </ListItem>
              </>
            ))}
          </InfiniteScroll>
        </List>
      </CartWrap>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const apollo = await fetchFinishedComms(session.id);

  if (!session) {
    return {
      redirect: "/auth/signin",
      permanent: false,
    };
  }

  return addApolloState(apollo, {
    props: {
      session,
      id: session.id,
    },
  });
};

export default FinishedCommissionCart;
