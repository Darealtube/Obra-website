import { Box, Typography, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { ReactNode, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";

const CommissionWrap = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const xs = useMediaQuery(`(max-width:340px)`);
  const [value, setValue] = useState(router.pathname);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };
  return (
    <>
      <Typography variant="h4" style={{ flexGrow: 1 }} align="center">
        Commissions
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        centered={xs ? false : true}
        variant={xs ? "scrollable" : "standard"}
      >
        <Tab label="Commissions" value={"/commissions"} />
        <Tab label="Your Commissions" value={"/commissions/yourCommissions"} />
      </Tabs>
      <Box display="flex" flexDirection="column">
        {children}
      </Box>
    </>
  );
};

export default CommissionWrap;
