import {
  Typography,
  Container,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { RecommendedPosts } from "../../interfaces/PostInterface";
import ArtList from "../ArtList";

type Parameters = {
  fetchMore: any;
  recommended: RecommendedPosts;
};

const RecommendedList = ({ fetchMore, recommended }: Parameters) => {
  const lg = useMediaQuery("(min-width: 1199px)");
  const sm = useMediaQuery("(max-width: 999px) and (min-width: 899px)");
  const xs = useMediaQuery("(max-width: 599px)");

  return (
    <>
      <Container>
        <Typography variant="h4" align="center">
          You May Like...
        </Typography>
        <Divider />
        {/* Recommended List */}
        <ArtList
          columns={xs || sm || lg ? 1 : 2}
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
