import { Snackbar, IconButton } from "@material-ui/core";
import React from "react";
import "react-calendar/dist/Calendar.css";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

type Props = {
  error: boolean;
  errMessage: string;
  handleErrorClose: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;
};

const ConfigSnack = ({ error, errMessage, handleErrorClose }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={error}
      autoHideDuration={6000}
      onClose={handleErrorClose}
    >
      <Alert severity="error">
        {errMessage}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleErrorClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default ConfigSnack;
