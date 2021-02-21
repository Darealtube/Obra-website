import {
  List,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Popover,
  Box,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import NoUserMenu from "../ListItems/NoUserMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      height: "100%",
      overflow: "auto",
      width: "20em",
    },
    box: {
      margin: theme.spacing(2.5, 2),
    },
  })
);

interface Prop {
  handleProfile: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleProfileClose: () => void;
  profAnchor: null | HTMLElement;
}

const AppbarNoUser = ({
  handleProfile,
  handleProfileClose,
  profAnchor,
}: Prop) => {
  const classes = useStyles();
  return (
    <div>
      <IconButton onClick={handleProfile}>
        <Avatar src="" />
      </IconButton>
      <Popover
        id="simple-menu"
        anchorEl={profAnchor}
        keepMounted
        open={Boolean(profAnchor)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box display="flex" flexWrap="wrap" className={classes.box}>
          <Avatar src="" />

          <div style={{ marginLeft: "25px" }}>
            <Typography>No Name</Typography>

            <Typography>No Email found</Typography>
          </div>
        </Box>
        <Divider />
        <List className={classes.menu}>
          <NoUserMenu />
        </List>
      </Popover>
    </div>
  );
};

export default AppbarNoUser;
