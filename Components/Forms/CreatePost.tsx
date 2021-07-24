import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { Action, State } from "../../Hooks/Reducers/PostReducer";
import styles from "../../pages/styles/General/Create.module.css";
import { PostValidate } from "../../utils/postValidator";

interface Props {
  post: State;
  setArt: (files: FileList) => Promise<{
    url: string;
    watermarkUrl: string;
    width: number;
    height: number;
  }>;
  dispatch: React.Dispatch<Action>;
  create: any;
  id: string;
}

const PostForm = ({ post, setArt, dispatch, create, id }: Props) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleNumber = (values: NumberFormatValues) => {
    dispatch({ type: "CHANGE", field: "price", payload: values.value });
  };

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setArt((e.target as HTMLInputElement).files).then((values) => {
        dispatch({
          type: "CHANGE_ART",
          artPayload: values,
        });
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "TAGS", payload: (e.target as HTMLInputElement).value });
  };

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SALE", payload: (e.target as HTMLInputElement).value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const valid = PostValidate(post);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
      setDisabled(false);
    } else {
      create({
        variables: {
          author: id,
          title: post.title,
          description: post.description,
          art: post.art,
          watermarkArt: post.watermarkArt,
          price: post.price,
          sale: post.sale,
          tags: post.tags,
          width: post.width,
          height: post.height,
        },
      });
      router.push("/home");
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
              rows={3}
              multiline={true}
              rowsMax={4}
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="tags"
              label="Tags"
              name="tags"
              color="secondary"
              placeholder="Seperate tags with comma (,) and input atleast 1 Tag"
              rows={2}
              multiline={true}
              onChange={handleTags}
              required
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
