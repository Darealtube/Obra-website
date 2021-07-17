import React, { useContext } from "react";
import { UserContext } from "../SettingsWrap";
import {
  Typography,
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@material-ui/core";
import Image from "next/image";

const CommissionInfo = () => {
const user = useContext(UserContext);
  return (
    <>
        <Grid
          container
          spacing={2}
          style={{ display: "flex", marginTop: "8px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography gutterBottom align="center" variant="h4">
              Commission Poster
            </Typography>
            <Box
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80vh"
            >
              <Image
                src={user.commissionPoster ? user.commissionPoster : "/user-empty-backdrop.jpg"}
                layout="fill"
                objectFit="contain"
                alt={"Commission Poster Placeholder"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom align="center" variant="h4">
              Commission Rates
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Type of Art</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.commissionRates && user.commissionRates.map((rate) => (
                    <TableRow key={rate.type}>
                      <TableCell align="center">{rate.type}</TableCell>
                      <TableCell align="center">{rate.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
    </>
  );
};

export default CommissionInfo;
