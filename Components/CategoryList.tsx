import styles from "../pages/styles/General/Trending.module.css";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Grow,
  Container,
} from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";

const CategoryList = ({ data, includeMoreButton = false }) => {
  return (
    <Grid container spacing={4}>
      {data?.map((tag, index) => (
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000 + index * 200}
          key={tag.node.name}
        >
          <Grid item lg={3} md={4} sm={6} xs={12} sx={{ marginBottom: "12px" }}>
            <Link
              passHref
              href={`/categories/${encodeURIComponent(tag.node.name)}`}
            >
              <Button
                sx={{
                  width: "100%",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                variant="outlined"
                component={Paper}
                elevation={6}
                className={styles.category}
              >
                <Typography gutterBottom variant="h6">
                  {tag.node.name}
                </Typography>
                <Typography>
                  {tag.node.artCount} art(s) in this category.
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grow>
      ))}
      {includeMoreButton && (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={5200}>
          <Grid item lg={3} md={4} sm={6} xs={12} sx={{ marginBottom: "12px" }}>
            <Link passHref href={`/categories/`}>
              <Button
                sx={{
                  width: "100%",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                variant="outlined"
                component={Paper}
                elevation={6}
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
