import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { State, reducer } from "../../Hooks/Reducers/PostReducer";
import useTag from "../../Hooks/useTag";
import { PostInterface } from "../../interfaces/PostInterface";
import styles from "../../pages/styles/General/Create.module.css";

interface Props {
  postId: PostInterface;
  edit: any;
  id: string;
}

const EditPostForm = ({ edit, id, postId }: Props) => {
  const initState: State = {
    title: postId.title,
    description: postId.description,
    art: postId.art,
    watermarkArt: postId.watermarkArt,
    price: postId.price,
    sale: postId.sale,
    tags: postId.tags,
    tagInput: "",
    width: postId.width,
    height: postId.height,
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [post, dispatch] = useReducer(reducer, initState);
  const { loading, options } = useTag(post.tagInput, open);
  const [disabled, setDisabled] = useState(false);
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
    _e: React.ChangeEvent<HTMLInputElement>,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    edit({
      variables: {
        postId: id,
        title: post.title,
        description: post.description,
        tags: post.tags.map((tag) => tag.name),
      },
    });
    router.push("/home");
  };

  const handleNumber = (values: NumberFormatValues) => {
    dispatch({ type: "CHANGE", field: "price", payload: values.value });
  };

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SALE", payload: (e.target as HTMLInputElement).value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              color="primary"
              required
              onChange={handleChange}
              defaultValue={post.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              fullWidth
              id="description"
              label="Description"
              name="description"
              color="primary"
              rows={8}
              multiline={true}
              rowsMax={4}
              required
              onChange={handleChange}
              defaultValue={post.description}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              margin="normal"
              variant="outlined"
              component="fieldset"
              disabled
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
                  disabled
                  inputMode="numeric"
                  allowNegative={false}
                  className={styles.price}
                  isNumericString={true}
                  onValueChange={handleNumber}
                />
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="asynchronous-demo"
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.name === value.name}
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
              renderOption={(option) => (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography noWrap>{option.name} </Typography>
                  <Chip
                    label={`${option.artCount} art(s) with this tag`}
                    size="small"
                    style={{ marginLeft: "12px" }}
                  />
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Select Tags or Input with , or Enter after word/phrase."
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
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
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditPostForm;
