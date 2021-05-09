import { DataProxy, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogContentText,
} from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useState } from "react";
import {
  ACCEPT_COMMISSION_MUTATION,
  COMMISSIONS_QUERY,
  PENDING_COMMS_QUERY,
} from "../../apollo/apolloQueries";
import {
  AcceptCommissionData,
  AcceptCommissionVars,
} from "../../interfaces/MutationInterfaces";
import {
  CommissionData,
  CommissionVars,
} from "../../interfaces/QueryInterfaces";

type Props = {
  open: boolean;
  id: string;
  handleClose: () => void;
};

const ConfirmDialog = ({ open, id, handleClose }: Props) => {
  const [session] = useSession();
  const [message, setMessage] = useState("");
  const [accept] = useMutation<AcceptCommissionData, AcceptCommissionVars>(
    ACCEPT_COMMISSION_MUTATION,
    {
      update: (cache: DataProxy, mutationResult) => {
        const newCommission = mutationResult.data.acceptCommission;
        const { userId } = cache.readQuery<CommissionData, CommissionVars>({
          query: COMMISSIONS_QUERY,
          variables: { id: session.id },
        });
        const { userId: userId2 } = cache.readQuery<
          CommissionData,
          CommissionVars
        >({
          query: PENDING_COMMS_QUERY,
          variables: { id: session.id },
        });
        const newPending = userId2.pendingCommissions.edges.filter(
          (commission) => commission.node.id != newCommission.id
        );
        cache.writeQuery({
          query: COMMISSIONS_QUERY,
          variables: { id: session.id },
          data: {
            userId: {
              ...userId,
              commissions: {
                ...userId.commissions,
                edges: [
                  { __typename: "CommissionEdge", node: newCommission },
                  ...userId.commissions.edges,
                ],
              },
            },
          },
        });
        cache.writeQuery({
          query: PENDING_COMMS_QUERY,
          variables: { id: session.id },
          data: {
            userId: {
              ...userId2,
              pendingCommissions: {
                ...userId2.pendingCommissions,
                edges: newPending,
              },
            },
          },
        });
      },
    }
  );

  const handleAccept = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    accept({
      variables: {
        commissionId: id,
        message: message,
      },
    });
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>Are you sure?</DialogTitle>
        <form onSubmit={handleAccept}>
          <DialogContent>
            <DialogContentText>
              Please leave a message on how you should be contacted about the
              price, and how you will transfer the art.
            </DialogContentText>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="message"
              label="Message"
              placeholder="Leave a message on how you should be contacted about the
              price, and how you will transfer the art."
              name="message"
              color="primary"
              inputProps={{ maxLength: 100, minLength: 20 }}
              rows={3}
              multiline={true}
              rowsMax={4}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Accept Commission
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
