import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Badge,
} from "@material-ui/core";
import Link from "next/link";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useQuery } from "@apollo/client";
import { REPORT_COUNT_QUERY } from "../../apollo/Queries/reportQueries";

const IssuesWrap = () => {
  const { data } = useQuery(REPORT_COUNT_QUERY);

  return <>
    <Box display="flex">
      <Link href="/" passHref>
        <IconButton component="a" size="large">
          <KeyboardBackspaceIcon />
        </IconButton>
      </Link>
      <Typography variant="h4">Reports</Typography>
      <Divider />
    </Box>
    <Box
      display="flex"
      marginTop={4}
      position="relative"
      justifyContent="center"
      marginBottom={4}
      flexWrap="wrap"
    >
      <Link href="/issues/post" passHref>
        <Badge
          color="secondary"
          badgeContent={data?.reportCount.postReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Button variant="outlined" component="a">
            <Typography style={{ wordWrap: "break-word" }}>
              Post Reports
            </Typography>
          </Button>
        </Badge>
      </Link>
      <Link href="/issues/comment" passHref>
        <Badge
          color="secondary"
          badgeContent={data?.reportCount.commentReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Button
            variant="outlined"
            component="a"
            style={{ marginRight: "4px", marginLeft: "4px" }}
          >
            <Typography style={{ wordWrap: "break-word" }}>
              Comment Reports
            </Typography>
          </Button>
        </Badge>
      </Link>
      <Badge
        color="secondary"
        badgeContent={data?.reportCount.userReport}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Button variant="outlined">
          <Typography style={{ wordWrap: "break-word" }}>
            User Reports
          </Typography>
        </Button>
      </Badge>
      <Link href="/issues/bug" passHref>
        <Badge
          color="secondary"
          badgeContent={data?.reportCount.bugReport}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Button
            variant="outlined"
            component="a"
            style={{ marginRight: "4px", marginLeft: "4px" }}
          >
            <Typography style={{ wordWrap: "break-word" }}>
              Bug Reports
            </Typography>
          </Button>
        </Badge>
      </Link>
    </Box>
  </>;
};

export default IssuesWrap;
