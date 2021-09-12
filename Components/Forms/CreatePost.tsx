import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { Autocomplete } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Action, State, Tag } from "../../Hooks/Reducers/PostReducer";
import useSearch from "../../Hooks/useSearch";
import { TagEdges, TagInterface } from "../../interfaces/PostInterface";

interface Props {
  post: State;
  disabled: boolean;
  dispatch: React.Dispatch<Action>;
}

const PostForm = ({ post, disabled, dispatch }: Props) => {
  const [open, setOpen] = useState(false);
  const { loading, options } = useSearch({
    key: post.tagInput,
    type: "tag",
    open,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  const handleTagActive = () => {
    setOpen(!open);
  };

  const handleTagInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    newInputValue
  ) => {
    dispatch({ type: "CHANGE", payload: newInputValue, field: "tagInput" });
  };

  const handleTagChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue
  ) => {
    dispatch({ type: "CHANGE", payload: newValue, field: "tags" });
  };

  const handleCustomTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "CUSTOM_TAG" });
    }
  };
  return (
    <>
      {/* Form */}
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="title"
        name="title"
        color="primary"
        placeholder="Title"
        inputProps={{ style: { fontSize: 40, textAlign: "center" } }}
        onChange={handleChange}
      />
      <Grid container spacing={2} sx={{ marginBottom: "8px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            color="primary"
            rows={6}
            multiline={true}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Autocomplete
            id="asynchronous-demo"
            getOptionLabel={(option: TagInterface) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            filterSelectedOptions
            onOpen={handleTagActive}
            onClose={handleTagActive}
            blurOnSelect={true}
            multiple
            value={post.tags}
            onChange={handleTagChange}
            inputValue={post.tagInput}
            onInputChange={handleTagInput}
            onKeyPress={handleCustomTag}
            options={(options as TagEdges[]).map((item) => item.node)}
            loading={loading}
            noOptionsText={<Typography>No Tags Found...</Typography>}
            renderOption={(props, option: Tag, _status) => (
              <li {...props}>
                <Container sx={{ display: "flex", margin: "8px 0px 8px 0px" }}>
                  <Typography noWrap>{option.name} </Typography>
                  <Chip
                    label={`${option.artCount} art(s) with this tag`}
                    size="small"
                    style={{ marginLeft: "12px" }}
                  />
                </Container>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tags or Input with , or Enter after word/phrase."
                variant="outlined"
                sx={{ maxHeight: "16vh", overflow: "auto" }}
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
          <Button
            sx={{ marginTop: "8px" }}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<Palette />}
            disabled={disabled}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Publish
          </Button>
        </Grid>
      </Grid>
      {/* Form */}
    </>
  );
};

export default PostForm;
