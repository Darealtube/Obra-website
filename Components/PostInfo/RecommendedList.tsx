import {
  Typography,
  Container,
  Divider,
  CircularProgress,
  ImageList,
  ImageListItem,
  useMediaQuery,
  Grow,
} from "@material-ui/core";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { RecommendedPosts } from "../../interfaces/PostInterface";
import usePagination from "../../Hooks/usePagination";
import Link from "next/link";

type Parameters = {
  fetchMore: any;
  recommended: RecommendedPosts;
};

const RecommendedList = ({ fetchMore, recommended }: Parameters) => {
  const lg = useMediaQuery("(min-width: 1199px)");
  const sm = useMediaQuery("(max-width: 999px) and (min-width: 899px)");
  const xs = useMediaQuery("(max-width: 599px)");
  const { More, hasMore } = usePagination({
    key: "recommendedPosts",
    fetchMore,
    info: recommended,
    limit: 12,
  });

  return (
    <>
      <Container>
        <Typography variant="h4" align="center">
          Related Tags
        </Typography>
        <Divider />
        {/* Recommended List */}
        <InfiniteScroll
          dataLength={recommended.edges.length}
          next={More}
          hasMore={hasMore}
          loader={
            <>
              <br />
              <CircularProgress />
            </>
          }
          style={{
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <ImageList cols={lg || sm || xs ? 1 : 2} gap={8} rowHeight={240}>
            {recommended.edges.map((tile) => (
              <Grow in={true} timeout={3000} key={tile.node.watermarkArt}>
                <ImageListItem
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <Link href={`/posts/${tile.node.id}/`} passHref>
                    <a>
                      <Image
                        src={tile.node.watermarkArt}
                        layout="fill"
                        objectFit="contain"
                        alt={"Art Image"}
                      />
                    </a>
                  </Link>
                </ImageListItem>
              </Grow>
            ))}
          </ImageList>
        </InfiniteScroll>
        {/* Recommended List */}
      </Container>
    </>
  );
};

export default RecommendedList;
