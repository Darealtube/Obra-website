import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { Autocomplete } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { useState } from "react";
import { State, reducer, Tag } from "../../Hooks/Reducers/PostReducer";
import {
  PostInterface,
  TagEdges,
  TagInterface,
} from "../../interfaces/PostInterface";
import useSearch from "../../Hooks/useSearch";
import { EditValidate } from "../../utils/postValidator";
import dynamic from "next/dynamic";

interface Props {
  postId: PostInterface;
  edit: any;
}

const DynamicErrorSnack = dynamic(() => import("./Snackbars/ErrorSnack"));

const EditPostForm = ({ edit, postId }: Props) => {
  const router = useRouter();
  const initState: State = {
    title: postId.title,
    description: postId.description,
    watermarkArt: postId.watermarkArt,
    tags: postId.tags,
    tagInput: "",
    error: false,
    errMessage: "",
  };
  const [open, setOpen] = useState(false);
  const [post, dispatch] = useReducer(reducer, initState);
  const [disabled, setDisabled] = useState(false);
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
          postId: postId?.id,
          title: post.title,
          description: post.description,
          tags: post.tags.map((tag) => tag.name),
        },
      });
      router.push("/");
    }
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
          defaultValue={post.title}
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
              defaultValue={post.description}
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
              options={(options as TagEdges[]).map((item) => item.node)}
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
      </form>
      <DynamicErrorSnack
        error={post.error}
        errMessage={post.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </>
  );
};

export default EditPostForm;
