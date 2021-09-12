import { useState } from "react";
import {
  CircularProgress,
  Autocomplete,
  TextField,
  Typography,
  IconButton,
  Menu,
  ListItem,
  Button,
  Dialog,
} from "@material-ui/core";
import useSearch from "../Hooks/useSearch";
import PersonIcon from "@material-ui/icons/Person";
import BrushIcon from "@material-ui/icons/Brush";
import Link from "next/link";
import { Box } from "@material-ui/system";
import styles from "../pages/styles/General/Home.module.css";
import { CategoryEdges, TagEdges } from "../interfaces/PostInterface";
import { UserEdges } from "../interfaces/UserInterface";

type Props = {
  searchOpen: boolean;
  handleClose: () => void;
};

const SearchBar = ({ searchOpen, handleClose }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<"category" | "user">("category");
  const [open, setOpen] = useState(false);
  const { loading, options } = useSearch({
    key: searchInput,
    type: searchType,
    open,
    executeOnMount: true,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const typeOpen = Boolean(anchorEl);
  const handleSearchType = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTypeMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchTypeClose = (e: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(null);
    setSearchType(e.currentTarget.value as "category" | "user");
  };

  const handleTagActive = () => {
    setOpen(!open);
  };

  const handleTagInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    newInputValue
  ) => {
    setSearchInput(newInputValue);
  };

  return (
    <Dialog open={searchOpen} onClose={handleClose} fullWidth>
      <Box className={styles.searchBarContainer}>
        <IconButton onClick={handleSearchType}>
          {searchType == "user" ? <PersonIcon /> : <BrushIcon />}
        </IconButton>
        <Autocomplete
          sx={{ flexGrow: 1 }}
          id="asynchronous-demo"
          onOpen={handleTagActive}
          onClose={handleTagActive}
          blurOnSelect={true}
          inputValue={searchInput}
          onInputChange={handleTagInput}
          options={options.map(
            (item: UserEdges | CategoryEdges | TagEdges) => item.node.name
          )}
          loading={loading}
          noOptionsText={<Typography>No Results Found...</Typography>}
          renderOption={(props, option: string, _status) => (
            <li {...props}>
              <Link
                href={
                  searchType === "user"
                    ? `/profile/${encodeURIComponent(option as string)}/`
                    : `/categories/${encodeURIComponent(option as string)}/`
                }
                passHref
              >
                <ListItem button component="a" onClick={handleClose}>
                  <Typography noWrap>{option}</Typography>
                </ListItem>
              </Link>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                searchType === "user" ? "Search Users" : "Search Categories"
              }
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      <Menu anchorEl={anchorEl} open={typeOpen} onClose={handleTypeMenuClose}>
        <ListItem>
          <Button
            value={"user"}
            onClick={handleSearchTypeClose}
            startIcon={<PersonIcon />}
          >
            Users
          </Button>
        </ListItem>
        <ListItem>
          <Button
            value={"category"}
            onClick={handleSearchTypeClose}
            startIcon={<BrushIcon />}
          >
            Categories
          </Button>
        </ListItem>
      </Menu>
    </Dialog>
  );
};

export default SearchBar;
