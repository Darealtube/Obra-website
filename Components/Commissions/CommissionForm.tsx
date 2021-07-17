import {
  Grid,
  Typography,
  TextField,
  Input,
  Button,
  Slider,
  CircularProgress,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import styles from "../../pages/styles/Specific/Commission.module.css";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { marks } from "../../utils/Options";
import React, { useRef, useState } from "react";
import useArt from "../../Hooks/useArt";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useMutation } from "@apollo/client";
import { CREATE_COMMISSION_MUTATION } from "../../apollo/apolloQueries";
import { Rates } from "../../interfaces/UserInterface";

const initState = {
  title: "",
  description: "",
  sampleArt: "",
  height: 0,
  width: 0,
  deadline: 3,
  price: [],
  rates: [],
};

type Props = {
  name: string;
  commissionRates: Rates[];
};

const CommissionForm = ({ name, commissionRates }: Props) => {
  const router = useRouter();
  const [session] = useSession();
  const inputFile = useRef<HTMLInputElement>();
  const { loading, setArt, placeholder } = useArt("/user-empty-backdrop.jpg");
  const [commissionArtist] = useMutation(CREATE_COMMISSION_MUTATION);
  const [commission, setCommission] = useState(initState);
  const [deadDisabled, setDeadDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let selectedRates = commission.price.map((rate) => rate.split(" - "));
    let prices = selectedRates.map((price) => +price[1]);
    let finalPrice = prices.reduce((a, b) => a + b);
    let finalRates = selectedRates.map((rate) => rate[0]);
    commissionArtist({
      variables: {
        artistName: router.query.name,
        userId: session?.id,
        title: commission.title,
        description: commission.description,
        width: +commission.width,
        height: +commission.height,
        deadline: commission.deadline,
        sampleArt: commission.sampleArt,
        price: finalPrice,
        rates: finalRates,
      },
    });
    router.push("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommission({
      ...commission,
      [e.target.name]: e.target.value,
    });
  };
  const handleArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setArt((e.target as HTMLInputElement).files).then((values) => {
        setCommission({
          ...commission,
          sampleArt: values.url,
        });
      });
    }
  };

  const handleNoDeadline = () => {
    setCommission({
      ...commission,
      deadline: null,
    });
    setDeadDisabled(true);
  };

  const handleDeadline = () => {
    setCommission({
      ...commission,
      deadline: 3,
    });
    setDeadDisabled(false);
  };

  const handleArtClick = () => {
    inputFile.current.click();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
            <InputLabel>Price Rates</InputLabel>
            <Select
              onChange={handleChange}
              value={commission.price}
              name="price"
              multiple
              required
              fullWidth
              renderValue={(selected) => (
                <Grid container style={{ maxHeight: "4em", overflow: "auto" }}>
                  {(selected as string[]).map((value, index) => (
                    <Grid item key={index}>
                      <Chip key={value} label={value} />
                    </Grid>
                  ))}
                </Grid>
              )}
            >
              {commissionRates.map((rate) => (
                <MenuItem
                  key={rate.price}
                  value={`${rate.type} - ${rate.price}`}
                >
                  {`${rate.type} - ${rate.price}`}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography>Height</Typography>
            <Input
              type="number"
              name="height"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography>Width</Typography>
            <Input
              type="number"
              name="width"
              onChange={handleChange}
              required
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
              disabled={deadDisabled}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={deadDisabled ? handleDeadline : handleNoDeadline}
              fullWidth
              variant="outlined"
            >
              <Typography>
                {deadDisabled ? "With Deadline" : "No Deadline"}
              </Typography>
            </Button>
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
    </form>
  );
};

export default CommissionForm;
