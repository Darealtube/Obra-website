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
  Container,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { Autocomplete } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { State, reducer, Tag } from "../../Hooks/Reducers/PostReducer";
import { PostInterface } from "../../interfaces/PostInterface";
import styles from "../../pages/styles/General/Create.module.css";
import useSearch from "../../Hooks/useSearch";
import { EditValidate } from "../../utils/postValidator";
import dynamic from "next/dynamic";

interface Props {
  postId: PostInterface;
  edit: any;
  id: string;
}

const DynamicError = dynamic(() => import("./Snackbars/ConfigSnack"));

const EditPostForm = ({ edit, id, postId }: Props) => {
  const initState: State = {
    title: postId.title,
    description: postId.description,
    watermarkArt: postId.watermarkArt,
    price: postId.price,
    sale: postId.sale,
    tags: postId.tags,
    tagInput: "",
    error: false,
    errMessage: "",
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [post, dispatch] = useReducer(reducer, initState);
  const { loading, options } = useSearch({
    key: post.tagInput,
    type: "tag",
    open,
  });
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
    const valid = EditValidate(post);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
      setDisabled(false);
    } else {
      edit({
        variables: {
          postId: id,
          title: post.title,
          description: post.description,
          tags: post.tags.map((tag) => tag.name),
        },
      });
      router.push("/");
    }
  };

  const handleNumber = (values: NumberFormatValues) => {
    dispatch({ type: "CHANGE", field: "price", payload: values.value });
  };

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SALE", payload: (e.target as HTMLInputElement).value });
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "ERROR", payload: false });
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
              maxRows={4}
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
              options={options.map((item) => item.node)}
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
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
      <DynamicError
        error={post.error}
        errMessage={post.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </>
  );
};

export default EditPostForm;
