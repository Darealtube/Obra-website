import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import PublicIcon from "@material-ui/icons/Public";
import CakeIcon from "@material-ui/icons/Cake";
import WorkIcon from "@material-ui/icons/Work";
import CallIcon from "@material-ui/icons/Call";
import styles from "../../../../pages/styles/General/Settings.module.css";
import { DatePicker, LocalizationProvider } from "@material-ui/lab";
import AdapterMoment from "@material-ui/lab/AdapterMoment";
import moment from "moment";
import { levelOptions } from "../../../../utils/Options";
import { Action, State } from "../../../../Hooks/Reducers/UserReducer";

type Props = {
  dispatch: React.Dispatch<Action>;
  user: State;
};

const InfoForm = ({ user, dispatch }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };
  const handleDate = (value: Date) => {
    dispatch({ type: "DATE_CHANGE", payload: value });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center">
            <CakeIcon />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={moment(user.birthday).format("l")}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                openTo="year"
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center">
            <PublicIcon />
            <Typography variant="h6" className={styles.text}>
              Lives in {user.country}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center">
            <WorkIcon />
            <Select
              value={user.artLevel}
              name="artLevel"
              fullWidth
              required
              onChange={handleChange}
            >
              {levelOptions.map((level, index) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center">
            <CallIcon />
            <TextField
              id="phone"
              name="phone"
              variant="standard"
              required
              color="primary"
              fullWidth
              value={user.phone}
              onChange={handleChange}
              inputProps={{
                style: {
                  fontSize: "1.17em",
                  fontWeight: "bolder",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default InfoForm;
