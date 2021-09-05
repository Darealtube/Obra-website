import { Grid, Typography, Box, Container, Divider } from "@material-ui/core";
import Image from "next/image";
import { CommissionInterface } from "../../interfaces/UserInterface";

const CommissionData = ({
  commission,
}: {
  commission: CommissionInterface;
}) => {
  return (
    <>
      <Container>
        <Grid container spacing={1} sx={{ maxHeight: "100%" }}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              position: "relative",
              height: "64vh",
              width: "100%",
              backgroundImage: `url(${"/user-empty-backdrop.jpg"})`,
              border: "8px ridge",
            }}
          >
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
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box width="100%" marginBottom={4}>
              <Typography variant="h4" align="center">
                Description
              </Typography>
              <Divider />
            </Box>
            <Box fontSize={22}>
              <Typography variant="h4" gutterBottom align="center">
                {commission.title}
              </Typography>
              <Typography variant="h6" gutterBottom paragraph align="center">
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
        </Grid>
      </Container>
    </>
  );
};

export default CommissionData;
