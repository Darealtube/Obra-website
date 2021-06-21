import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import Link from "next/link";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const IssuesWrap = () => {
  return (
    <>
      <Box display="flex">
        <Link href="/home">
          <IconButton component="a">
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
        <Link href="/issues/post">
          <Button
            variant="outlined"
            component="a"
          >
            <Typography style={{ wordWrap: "break-word" }}>
              Post Reports
            </Typography>
          </Button>
        </Link>
        <Link href="/issues/comment">
        <Button variant="outlined" component="a" style={{ marginRight: "4px", marginLeft: "4px" }}>
          <Typography style={{ wordWrap: "break-word"}}>
            Comment Reports
          </Typography>
        </Button>
        </Link>
        <Button variant="outlined">
          <Typography style={{ wordWrap: "break-word" }}>
            User Reports
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default IssuesWrap;
