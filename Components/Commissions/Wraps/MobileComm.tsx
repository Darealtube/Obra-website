import {
  Box,
  Typography,
  Button,
  Divider,
  SwipeableDrawer,
  Container,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import styles from "../../../pages/styles/Specific/Commission.module.css";
import CommList from "../Lists/CommList";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { UserInterface } from "../../../interfaces/UserInterface";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  userId: UserInterface;
  fetchMore: any;
};

const MobileComm = ({
  children,
  handleClick,
  loading,
  userId,
  fetchMore,
}: Props) => {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

  return <>
    <div className={styles.wrapRoot}>
      <Container>
        <Box>
          <Toolbar>
            <Typography variant="h4" style={{ flexGrow: 1 }}>
              Commissions
            </Typography>
            <IconButton onClick={handleDrawer} size="large">
              <MenuIcon />
            </IconButton>
          </Toolbar>
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
          <Button
            variant="outlined"
            style={{ margin: "4px 4px 4px 4px" }}
            onClick={handleClick}
          >
            <Typography style={{ wordWrap: "break-word" }}>
              Your Commissions
            </Typography>
          </Button>
          <Button variant="outlined" style={{ margin: "4px 4px 4px 4px" }}>
            <Typography style={{ wordWrap: "break-word" }}>
              Your Finished Commissions
            </Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column">
          {children}
        </Box>
      </Container>
    </div>
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={handleDrawer}
      onOpen={handleDrawer}
    >
      {!loading && userId && (
        <CommList commissions={userId.commissions} fetchMore={fetchMore} />
      )}
    </SwipeableDrawer>
  </>;
};

export default MobileComm;
