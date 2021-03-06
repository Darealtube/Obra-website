import {
  Container,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import styles from "../styles/General/Home.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import CategoryList from "../../Components/CategoryList";
import useSearch from "../../Hooks/useSearch";
import { useState } from "react";
import { CategoryEdges } from "../../interfaces/PostInterface";

const CategoriesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const { hasMore, options, moreOptions, loading } = useSearch({
    key: searchInput,
    type: "category",
    open,
    limit: 20,
    executeOnMount: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const toggleSearch = () => {
    setOpen(!open);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Categories</title>
      </Head>
      <Container>
        <Typography align="center" variant="h4" gutterBottom>
          Search art categories/tags that you would like to see!
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="search"
          placeholder="Search Categories"
          name="searchInput"
          color="primary"
          onChange={handleSearch}
          onFocus={toggleSearch}
          onBlur={toggleSearch}
          InputProps={{
            className: styles.searchBar,
            endAdornment: loading && <CircularProgress />,
          }}
        />
      </Container>
      <InfiniteScroll
        dataLength={options.length}
        next={moreOptions}
        hasMore={hasMore}
        loader={
          <>
            <br />
            <CircularProgress />
          </>
        }
        scrollThreshold={0.8}
        style={{
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Container className={styles.categoryContainer}>
          {!loading && <CategoryList data={options as CategoryEdges[]} />}
        </Container>
      </InfiniteScroll>
    </>
  );
};

export default CategoriesPage;
