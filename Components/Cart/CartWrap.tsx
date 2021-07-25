import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import styles from "../../pages/styles/General/Cart.module.css";
import CartSummary from "./CartSummary";
import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const DynamicMobileSummary = dynamic(() => import("./CartSummaryDrawer"));

type Props = {
  children: ReactNode;
  totalPrice: number;
}

const CartWrap = ({ children, totalPrice }: Props) => {
  const Small = useMediaQuery("(max-width: 960px)");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [finalCost, setFinalCost] = useState(totalPrice);

  const handleDrawerClose = () => {
    setToggleDrawer(false);
  };

  const handleDrawerOpen = () => {
    setToggleDrawer(true);
  };

  useEffect(() => {
    setFinalCost(totalPrice);
  }, [totalPrice]);

  return (
    <div className={styles.root}>
      <Grid container>
        <Grid item sm={12} md={8} className={styles.cartList}>
          <Box marginTop={10} width="100%">
            <Container style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/cart/" passHref>
                <Button
                  component="a"
                  variant="outlined"
                  style={{ marginRight: "12px" }}
                  fullWidth
                >
                  <Typography>Art Cart</Typography>
                </Button>
              </Link>
              <Link href="/cart/finishedCommissions" passHref>
                <Button
                  component="a"
                  variant="outlined"
                  style={{ marginLeft: "12px" }}
                  fullWidth
                >
                  <Typography>Finished Commissions</Typography>
                </Button>
              </Link>
            </Container>
            {children}
            {Small && (
              <Button
                fullWidth
                variant="contained"
                style={{ position: "sticky", bottom: "0" }}
                onClick={handleDrawerOpen}
              >
                Order Summary
              </Button>
            )}
          </Box>
        </Grid>

        {!Small ? (
          <CartSummary totalPrice={totalPrice} finalCost={finalCost} />
        ) : (
          <DynamicMobileSummary
            open={toggleDrawer}
            handleClose={handleDrawerClose}
            totalPrice={totalPrice}
            finalCost={finalCost}
          />
        )}
      </Grid>
    </div>
  );
};

export default CartWrap;
