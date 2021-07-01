import { ApolloError } from "@apollo/client";
import { useState } from "react";

const useGraphError = () => {
  const [err, setErr] = useState({
    error: false,
    errMessage: "",
    errDisabled: false,
  });

  const handleError = (error: ApolloError, timeout?: number) => {
    setErr({
      error: true,
      errMessage: `${error.message}. You cannot do this action again for a while because you are being rate limited.`,
      errDisabled: true,
    });

    if (timeout) {
      setTimeout(() => {
        setErr({
          ...err,
          errDisabled: false,
        });
      }, timeout);
    }
  };

  const closeError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErr({
      ...err,
      error: false,
      errMessage: "",
    });
  };
  return { err, handleError, closeError };
};

export default useGraphError;
