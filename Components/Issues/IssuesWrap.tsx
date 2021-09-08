import { Box, Typography, Button, Badge, Container } from "@material-ui/core";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { REPORT_COUNT_QUERY } from "../../apollo/Queries/reportQueries";

const IssuesWrap = ({ children }) => {
  const { data } = useQuery(REPORT_COUNT_QUERY);

  return (
    <>
      <Box
        display="flex"
        marginTop={4}
        position="relative"
        justifyContent="center"
        marginBottom={4}
        flexWrap="wrap"
      >
        <Badge
          color="secondary"
          badgeContent={data?.reportCount.postReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link href="/issues/post" passHref>
            <Button variant="outlined" component="a">
              <Typography style={{ wordWrap: "break-word" }}>
                Post Reports
              </Typography>
            </Button>
          </Link>
        </Badge>

        <Badge
          color="secondary"
          badgeContent={data?.reportCount.commentReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link href="/issues/comment" passHref>
            <Button
              variant="outlined"
              component="a"
              style={{ marginRight: "4px", marginLeft: "4px" }}
            >
              <Typography style={{ wordWrap: "break-word" }}>
                Comment Reports
              </Typography>
            </Button>
          </Link>
        </Badge>

        <Badge
          color="secondary"
          badgeContent={data?.reportCount.bugReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link href="/issues/bug" passHref>
            <Button
              variant="outlined"
              component="a"
              style={{ marginRight: "4px", marginLeft: "4px" }}
            >
              <Typography style={{ wordWrap: "break-word" }}>
                Bug Reports
              </Typography>
            </Button>
          </Link>
        </Badge>
      </Box>
      <Container>{children}</Container>
    </>
  );
};

export default IssuesWrap;
