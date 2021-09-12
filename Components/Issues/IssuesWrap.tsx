import { Tabs, Tab, Badge, Container, useMediaQuery } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { REPORT_COUNT_QUERY } from "../../apollo/Queries/reportQueries";
import { useRouter } from "next/router";
import { useState, SyntheticEvent, ReactNode } from "react";

const IssuesWrap = ({ children }: { children: ReactNode }) => {
  const { data } = useQuery(REPORT_COUNT_QUERY);
  const router = useRouter();
  const xs = useMediaQuery(`(max-width:340px)`);
  const [value, setValue] = useState(router.pathname);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered={xs ? false : true}
        variant={xs ? "scrollable" : "standard"}
      >
        <Tab
          label={
            <>
              <Badge
                badgeContent={data?.reportCount.postReport}
                color="primary"
              >
                Post Reports
              </Badge>
            </>
          }
          value={"/issues/post"}
        />
        <Tab
          label={
            <>
              <Badge
                badgeContent={data?.reportCount.commentReport}
                color="primary"
              >
                Comment Reports
              </Badge>
            </>
          }
          value={"/issues/comment"}
        />
        <Tab
          label={
            <>
              <Badge badgeContent={data?.reportCount.bugReport} color="primary">
                Bug Reports
              </Badge>
            </>
          }
          value={"/issues/bug"}
        />
      </Tabs>
      <Container>{children}</Container>
    </>
  );
};

export default IssuesWrap;
