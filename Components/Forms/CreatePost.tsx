import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { Autocomplete } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { Action, State, Tag } from "../../Hooks/Reducers/PostReducer";
import useSearch from "../../Hooks/useSearch";
import styles from "../../pages/styles/General/Create.module.css";

interface Props {
  post: State;
  disabled: boolean;
  dispatch: React.Dispatch<Action>;
  handleArt: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const PostForm = ({
  post,
  disabled,
  dispatch,
  handleArt,
  handleSubmit,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { loading, options } = useSearch({
    key: post.tagInput,
    type: "tag",
    open,
  });

  const handleNumber = (values: NumberFormatValues) => {
    dispatch({ type: "CHANGE", field: "price", payload: values.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SALE", payload: (e.target as HTMLInputElement).value });
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              color="primary"
              onChange={handleChange}
            />
          </Grid>
          {/* Changes */}
          <Grid item xs={12}>
            <Input type="file" name="image" onChange={handleArt} required />
          </Grid>
          {/* Changes */}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              color="primary"
              multiline={true}
              maxRows={4}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              margin="normal"
              variant="outlined"
              component="fieldset"
              required
            >
              <FormLabel component="legend">Is it for Sale?</FormLabel>
              <RadioGroup
                row
                aria-label="Sale"
                name="sale"
                onChange={handleSale}
                value={post.sale}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl margin="normal" variant="outlined">
              <FormLabel component="legend">Price</FormLabel>
              <div style={{ marginTop: ".5em" }}>
                <NumberFormat
                  value={post.price}
                  displayType={"input"}
                  thousandSeparator={true}
                  prefix={"₱"}
                  disabled={post.sale === "No" ? true : false}
                  inputMode="numeric"
                  allowNegative={false}
                  className={styles.price}
                  isNumericString={true}
                  onValueChange={handleNumber}
                  required={post.sale === "No" ? false : true}
                />
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="asynchronous-demo"
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
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
              options={options}
              loading={loading}
              noOptionsText={<Typography>No Tags Found...</Typography>}
              renderOption={(props, option: Tag, _status) => (
                <li {...props}>
                  <Container
                    sx={{ display: "flex", margin: "8px 0px 8px 0px" }}
                  >
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
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<Palette />}
              disabled={disabled}
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Form */}
    </>
  );
};

export default PostForm;
