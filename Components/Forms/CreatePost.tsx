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
import React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { State } from "../../Hooks/Reducers/PostReducer";
import styles from "../../pages/styles/General/Create.module.css";

interface Props {
  post: State;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleArt: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleTags: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumber: (values: NumberFormatValues) => void;
  handleSale: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostForm = ({
  post,
  handleSubmit,
  handleChange,
  handleArt,
  handleTags,
  handleNumber,
  handleSale,
}: Props) => {
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
