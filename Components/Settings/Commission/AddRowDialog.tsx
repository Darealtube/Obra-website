import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
  handleAddRow: ({ type, price }: { type: string; price: number }) => void;
};

const AddRowDialog = ({ open, handleCloseDialog, handleAddRow }: Props) => {
  const [rowInfo, setRowInfo] = useState({
    type: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowInfo({
      ...rowInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddRow(rowInfo);
    setRowInfo({
      type: "",
      price: 0,
    });
    handleCloseDialog();
  };

  const handleNumber = (values: NumberFormatValues) => {
    setRowInfo({
      ...rowInfo,
      price: +values.value,
    });
  };

  const handleClose = () => {
    setRowInfo({
      type: "",
      price: 0,
    });
    handleCloseDialog();
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle style={{ textAlign: "center" }}>Add Row</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="none"
                  required
                  fullWidth
                  id="type"
                  label="Type of Art"
                  placeholder="Leave a message on how you should be contacted about the
              price, and how you will transfer the art."
                  name="type"
                  color="primary"
                  inputProps={{ maxLength: 40 }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NumberFormat
                  value={rowInfo.price}
                  displayType={"input"}
                  thousandSeparator
                  prefix={"₱"}
                  inputMode="numeric"
                  allowNegative={false}
                  isNumericString
                  onValueChange={handleNumber}
                  style={{ height: "90%", width: "100%" }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add Row
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddRowDialog;
