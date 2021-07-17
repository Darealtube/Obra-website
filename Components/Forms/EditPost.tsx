import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Palette from "@material-ui/icons/Palette";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { Action, State, reducer } from "../../Hooks/Reducers/PostReducer";
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
    tags: postId.tags as string[],
    width: postId.width,
    height: postId.height,
  };
  const router = useRouter();
  const [post, dispatch] = useReducer(reducer, initState);
  const [disabled, setDisabled] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    edit({
      variables: {
        postId: id,
        title: post.title,
        description: post.description,
        tags: post.tags,
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
              defaultValue={post.tags}
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
