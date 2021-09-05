import {
  Typography,
  Container,
  Divider,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useContext } from "react";
import { RecommendedPosts } from "../../interfaces/PostInterface";
import { AppContext } from "../Appbar/AppWrap";
import ArtList from "../ArtList";

type Parameters = {
  fetchMore: any;
  recommended: RecommendedPosts;
};

const RecommendedList = ({ fetchMore, recommended }: Parameters) => {
  const theme = useTheme();
  const drawerOpen = useContext(AppContext);
  const xl = useMediaQuery(theme.breakpoints.up("lg"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  

  const drawerOpenColumns = xl ? 3 : 2;
  const drawerCloseColumns = lg || xs ? 1 : md ? 3 : 2;

  return (
    <>
      <Container>
        <Typography variant="h4" align="center">
          You May Like...
        </Typography>
        <Divider />
        {/* Recommended List */}
        <ArtList
          columns={drawerOpen ? drawerOpenColumns : drawerCloseColumns}
          fetchMore={fetchMore}
          data={recommended}
          first={"recommended"}
        />
        {/* Recommended List */}
      </Container>
    </>
  );
};

export default RecommendedList;
