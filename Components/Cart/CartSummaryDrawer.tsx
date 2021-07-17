import {
  Button,
  Paper,
  Container,
  Typography,
  Box,
  Divider,
  TextField,
  Drawer,
} from "@material-ui/core";
import styles from "../../pages/styles/General/Cart.module.css";

type Props = {
  open: boolean;
  handleClose: () => void;
  totalPrice: number;
  finalCost: number;
};

const CartSummaryDrawer = ({
  open,
  handleClose,
  totalPrice,
  finalCost,
}: Props) => {
  return (
    <Drawer
      className={styles.cartSummary}
      anchor={"bottom"}
      open={open}
      onClose={handleClose}
    >
      <Paper elevation={6} className={styles.drawerSummaryPaper}>
        <Container className={styles.paperContainer}>
          <Typography>Location:</Typography>
          <Divider />
          <Box marginTop={2}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Box display="flex">
              <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
                Total Cost:
              </Typography>
              <Typography>&#x20B1; {totalPrice}</Typography>
            </Box>
            <Box display="flex">
              <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
                Donator Perk:
              </Typography>
              <Typography>-&#x20B1; 0</Typography>
            </Box>
            <Divider />
            <Box display="flex" marginTop={2}>
              <Typography variant="h5" style={{ flexGrow: 1 }}>
                Final Cost:
              </Typography>
              <Typography>&#x20B1; {finalCost}</Typography>
            </Box>
          </Box>
          <Box marginTop={4} marginBottom={2}>
            <form>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Discount Code"
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" color="primary">
                      <Typography>Apply</Typography>
                    </Button>
                  ),
                }}
              />
            </form>
          </Box>
          <Button variant="contained" color="secondary" fullWidth>
            <Typography>Proceed to Checkout</Typography>
          </Button>
        </Container>
      </Paper>
    </Drawer>
  );
};

export default CartSummaryDrawer;
