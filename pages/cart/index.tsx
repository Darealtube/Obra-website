import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Button,
  useMediaQuery,
  Box,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import styles from "../styles/General/Cart.module.css";
import Head from "next/head";
import CartWrap from "../../Components/Cart/CartWrap";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { addApolloState } from "../../apollo/apolloClient";
import { fetchCart } from "../../utils/fetchData";
import { useMutation, useQuery } from "@apollo/client";
import {
  CART_QUERY,
  REMOVE_SELECTED_FROM_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from "../../apollo/apolloQueries";
import { UserIdData, UserIdVars } from "../../interfaces/QueryInterfaces";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import Appbar from "../../Components/Appbar/Appbar";
import usePagination from "../../Hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { removeCartUpdate, removeSelectedUpdate } from "../../utils/update";

const Cart = ({ id }) => {
  const LaptopL = useMediaQuery("(max-width: 1236px)");
  const Laptop = useMediaQuery("(max-width: 1100px)");
  const Small = useMediaQuery("(max-width: 959px)");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selected, setSelected] = useState([]);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION);
  const [removeSelectedFromCart] = useMutation(
    REMOVE_SELECTED_FROM_CART_MUTATION
  );
  const {
    data: { userId },
    fetchMore,
  } = useQuery<UserIdData, UserIdVars>(CART_QUERY, {
    variables: {
      limit: 4,
      id: id,
    },
  });

  const { More, hasMore, ref } = usePagination({
    key: "userId",
    fetchMore,
    info: userId.cart,
    limit: 4,
    key2: "cart",
    executeWhileUnscrollable: true,
    onDeleteLimit: selected.length,
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected((prevselected) => [...prevselected, e.target.id]);
      setTotalPrice((prevtotal) => prevtotal + +e.target.value);
    } else if (!e.target.checked) {
      setSelected((prevselected) =>
        prevselected.filter((id) => id != e.target.id)
      );
      setTotalPrice((prevtotal) => prevtotal - +e.target.value);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(userId.cart.idList);
      setTotalPrice(userId.cart.totalCost);
    } else {
      setSelected([]);
      setTotalPrice(0);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let itemId = e.currentTarget.id;
    let itemPrice = e.currentTarget.value;
    let wasSelected = selected.includes(e.currentTarget.id);
    removeFromCart({
      variables: { itemID: e.currentTarget.id, userID: id },
      optimisticResponse: {
        removeFromCart: {
          __typename: "RemoveCartResult",
          idList: [],
          totalCost: 0,
          optimistic: true,
        },
      },
      update: (cache, mutationResult) => {
        removeCartUpdate(cache, mutationResult, id, e.currentTarget?.id);
        if (mutationResult.data.removeFromCart.optimistic && wasSelected) {
          setSelected((prevselected) =>
            prevselected.filter((id) => id != itemId)
          );
          setTotalPrice((prevtotal) => prevtotal - +itemPrice);
        }
      },
    });
  };

  const handleRemoveSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeSelectedFromCart({
      variables: { userID: id, selected: selected },
      optimisticResponse: {
        removeSelectedFromCart: {
          __typename: "RemoveCartResult",
          idList: [],
          totalCost: 0,
          optimistic: true,
        },
      },
      update: (cache, mutationResult) => {
        removeSelectedUpdate(cache, mutationResult, id, selected);
        if (mutationResult.data.removeSelectedFromCart.optimistic) {
          setSelected([]);
          setTotalPrice(0);
        }
      },
    });
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>My Cart</title>
      </Head>
      <Appbar />
      <CssBaseline />
      <CartWrap totalPrice={totalPrice}>
        <List className={styles.artCart} id="artCart" ref={ref}>
          <Box display="flex" flexDirection={Small ? "column" : "row"}>
            <ListItem style={{ backgroundColor: "peachpuff" }}>
              <ListItemAvatar>
                <Checkbox
                  color="primary"
                  onChange={handleSelectAll}
                  checked={selected === userId.cart.idList}
                />
              </ListItemAvatar>
              <ListItemText
                primary={"Select All Items"}
                style={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveSelected}
              >
                <Typography>Remove Selected Items</Typography>
              </Button>
            </ListItem>
          </Box>
          <InfiniteScroll
            dataLength={userId.cart.edges.length}
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
            {userId.cart.edges.map((item) => (
              <>
                <ListItem key={item.node.id} style={{ display: "flex" }}>
                  <Box>
                    <ListItemAvatar>
                      <Image
                        src={item.node.postID.watermarkArt}
                        width={400}
                        height={200}
                        className={styles.avatar}
                        alt={"Author Image"}
                      />
                    </ListItemAvatar>
                  </Box>
                  <ListItemText
                    style={{ marginLeft: "12px", flexGrow: 1 }}
                    primary={item.node.postID.title}
                    secondary={
                      <>
                        {item.node.postID.description},{" "}
                        {(Small || Laptop) && `Price: ${item.node.cost}`}
                      </>
                    }
                  />
                  {!Laptop && !Small && (
                    <ListItemText primary={item.node.cost} />
                  )}

                  <Box
                    className={styles.cartActions}
                    style={
                      LaptopL && !Small
                        ? { flexDirection: "column" }
                        : { flexDirection: "row" }
                    }
                  >
                    <Checkbox
                      color="primary"
                      id={item.node.id}
                      value={item.node.cost}
                      onChange={handleSelect}
                      checked={selected.includes(item.node.id)}
                    />
                    <IconButton
                      aria-label="edit"
                      id={item.node.id}
                      value={item.node.cost}
                      onClick={handleRemove}
                    >
                      <DeleteIcon />
                    </IconButton>
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
  const apollo = await fetchCart(session.id);

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

export default Cart;
