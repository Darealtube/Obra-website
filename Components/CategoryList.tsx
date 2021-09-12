import styles from "../pages/styles/General/Trending.module.css";
import { Typography, Grid, Button, Grow } from "@material-ui/core";
import Link from "next/link";
import { CategoryEdges, CategoryInterface } from "../interfaces/PostInterface";

type Props = {
  data: CategoryInterface[] | CategoryEdges[];
  includeMoreButton?: boolean;
};

const CategoryList = ({ data, includeMoreButton = false }: Props) => {
  return (
    <Grid
      container
      spacing={4}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {data?.map((tag, index) => (
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000 + index * 200}
          key={tag.node?.name || tag.name}
        >
          <Grid item xs={"auto"} sx={{ marginBottom: "12px" }}>
            <Link
              passHref
              href={`/categories/${encodeURIComponent(
                tag.node?.name || tag.name
              )}`}
            >
              <Button
                variant="outlined"
                component="a"
                className={styles.category}
              >
                <Typography gutterBottom variant="h6" align="center">
                  {tag.node?.name || tag.name}
                </Typography>
                <Typography align="center">
                  {tag.node?.artCount || tag.artCount} art(s) in this category.
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grow>
      ))}
      {includeMoreButton && (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={5200}>
          <Grid item xs={"auto"} sx={{ marginBottom: "12px" }}>
            <Link passHref href={`/categories/`}>
              <Button
                variant="outlined"
                component="a"
                className={styles.category}
              >
                <Typography gutterBottom variant="h6">
                  and More...
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grow>
      )}
    </Grid>
  );
};

export default CategoryList;
