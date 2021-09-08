import { Box, Typography, Button } from "@material-ui/core";
import { ReactNode } from "react";
import Link from "next/link";

const CommissionWrap = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Typography variant="h4" style={{ flexGrow: 1 }} align="center">
        Commissions
      </Typography>
      <Box
        display="flex"
        marginTop={4}
        position="relative"
        justifyContent="center"
        marginBottom={4}
        flexWrap="wrap"
      >
        <Link href="/commissions" passHref>
          <Button
            variant="outlined"
            component="a"
            style={{ margin: "4px 4px 4px 4px" }}
          >
            <Typography style={{ overflowWrap: "break-word" }}>
              Commissions
            </Typography>
          </Button>
        </Link>
        <Link href="/commissions/yourCommissions/" passHref>
          <Button
            variant="outlined"
            style={{ margin: "4px 4px 4px 4px" }}
            component="a"
          >
            <Typography style={{ wordWrap: "break-word" }}>
              Your Commissions
            </Typography>
          </Button>
        </Link>
      </Box>
      <Box display="flex" flexDirection="column">
        {children}
      </Box>
    </>
  );
};

export default CommissionWrap;
