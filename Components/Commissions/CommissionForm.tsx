import {
  Grid,
  Typography,
  TextField,
  Input,
  Button,
  Slider,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { marks } from "../../utils/Options";
import { Dispatch } from "react";
import { Rates } from "../../interfaces/UserInterface";
import { Action, State } from "../../Hooks/Reducers/CommissionReducer";

type Props = {
  name: string;
  commissionRates: Rates[];
  commission: State;
  dispatch: Dispatch<Action>;
};

const CommissionForm = ({
  name,
  commissionRates,
  commission,
  dispatch,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

  const handleDeadlineChange = (_e: Event, newValue: number | number[]) => {
    dispatch({
      type: "CHANGE",
      field: "deadline",
      payload: newValue as number,
    });
  };

  const toggleDeadline = () => {
    dispatch({ type: "TOGGLE_DEADLINE" });
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
            maxRows={4}
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
              <MenuItem key={rate.price} value={`${rate.type} - ${rate.price}`}>
                {`${rate.type} - ${rate.price}`}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Typography>Height</Typography>
          <Input type="number" name="height" onChange={handleChange} required />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography>Width</Typography>
          <Input type="number" name="width" onChange={handleChange} required />
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
            onChange={handleDeadlineChange}
            disabled={commission.deadlineDisabled}
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
          <Button onClick={toggleDeadline} fullWidth variant="outlined">
            <Typography>
              {commission.deadlineDisabled ? "With Deadline" : "No Deadline"}
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            disabled={commission.submitDisabled}
          >
            Submit Commission
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CommissionForm;
