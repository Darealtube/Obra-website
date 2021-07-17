import { useMutation, DataProxy } from "@apollo/client";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { FINISH_COMMISSION_MUTATION } from "../../apollo/apolloQueries";
import { CommissionInterface } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Commission.module.css";
import { finishCommissionUpdate } from "../../utils/update";

const DynamicFinishForm = dynamic(() => import("./FinishCommission"));

const CommissionData = ({
  commission,
  sessionId,
}: {
  commission: CommissionInterface;
  sessionId: string;
}) => {
  const [finishComm, setfinishComm] = useState(false);
  const [finishCommission] = useMutation(FINISH_COMMISSION_MUTATION, {
    update: (cache: DataProxy) => {
      finishCommissionUpdate(cache, sessionId, commission.id);
    },
  });
  const handleFinish = () => {
    setfinishComm(!finishComm);
  };

  return (
    <>
      <div className={styles.list2}>
        <Grid container spacing={2} style={{ width: "100%", height: "100%" }}>
          <Grid item xs={6}>
            <Box fontSize={22}>
              <Typography variant="h4" gutterBottom>
                {commission.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {commission.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Size: {commission.width} x {commission.height}{" "}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: {commission.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Rates/Extras: {commission.rates.join(", ").toString()}
              </Typography>

              <Typography variant="body1" gutterBottom>
                Deadline: {commission.deadline || "No Deadline"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date Issued: {commission.dateIssued}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <Image
              src={
                commission.sampleArt
                  ? commission.sampleArt
                  : "/user-empty-backdrop.jpg"
              }
              layout="fill"
              objectFit="contain"
              alt={"Commission Sample Art"}
            />
          </Grid>
          {commission.fromUser.id === sessionId && commission.finished && (
            <Grid item xs={12} className={styles.finishedItem}>
              <Typography>
                Already Finished. Check your cart in order to pay for it.
              </Typography>
            </Grid>
          )}
          {commission.toArtist.id === sessionId && commission.accepted && (
            <Grid item xs={12} className={styles.finishedItem}>
              {!commission.finished ? (
                <Button variant="outlined" onClick={handleFinish}>
                  <Typography>Finish this commission</Typography>
                </Button>
              ) : (
                <Typography>Already Finished.</Typography>
              )}
            </Grid>
          )}
          <DynamicFinishForm
            open={finishComm}
            commissionId={commission.id}
            finishCommission={finishCommission}
          />
        </Grid>
      </div>
    </>
  );
};

export default CommissionData;
