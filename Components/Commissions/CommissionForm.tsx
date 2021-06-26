import {
  Grid,
  Typography,
  TextField,
  Input,
  Button,
  Slider,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Commission.module.css"
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { marks } from "../../utils/Options";
import { Dispatch, SetStateAction, useRef } from "react";
import useArt from "../../Hooks/useArt";

interface Commission {
  title: string;
  description: string;
  sampleArt: string;
  height: number;
  width: number;
  deadline: number;
}

type Props = {
  commission: Commission;
  setCommission: Dispatch<SetStateAction<Commission>>;
  name: string;
};

const CommissionForm = ({ commission, setCommission, name }: Props) => {
  const inputFile = useRef<HTMLInputElement>();
  const { loading, setArt, placeholder } = useArt("/user-empty-backdrop.jpg");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommission({
      ...commission,
      [e.target.name]: e.target.value,
    });
  };
  const handleArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArt((e.target as HTMLInputElement).files).then((values) => {
      setCommission({
        ...commission,
        sampleArt: values.url,
      });
    });
  };
  const handleArtClick = () => {
    inputFile.current.click();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Commission {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            variant="filled"
            margin="normal"
            required
            color="primary"
            fullWidth
            label="Title"
            onChange={handleChange}
          />
        </Grid>
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
        <Grid item xs={12} sm={6}>
          <Typography>Deadline (days from now)</Typography>
          <Slider
            defaultValue={3}
            aria-labelledby="discrete-slider-custom"
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            name="deadline"
            min={3}
            max={7}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Height</Typography>
          <Input type="number" name="height" onChange={handleChange} required />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Width</Typography>
          <Input type="number" name="width" onChange={handleChange} required />
        </Grid>
        <Grid item xs={12} className={styles.sample}>
          {!loading ? (
            <>
              <Image
                src={placeholder}
                layout="fill"
                objectFit="cover"
                alt={"Art Commission Placeholder"}
              />
              <IconButton onClick={handleArtClick}>
                <PhotoCameraIcon />
              </IconButton>
            </>
          ) : (
            <CircularProgress />
          )}
          <input
            type="file"
            id="sampleArt"
            name="sampleArt"
            style={{ display: "none" }}
            ref={inputFile}
            onChange={handleArt}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="outlined">
            Submit Commission
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CommissionForm;
