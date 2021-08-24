import { Grid, Typography, Box, Button } from "@material-ui/core";
import Image from "next/image";
import { CommissionInterface } from "../../interfaces/UserInterface";
import styles from "../../pages/styles/Specific/Commission.module.css";

const CommissionData = ({
  commission,
}: {
  commission: CommissionInterface;
}) => {
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
        </Grid>
      </div>
    </>
  );
};

export default CommissionData;
