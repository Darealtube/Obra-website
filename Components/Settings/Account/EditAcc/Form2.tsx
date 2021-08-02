import { Grid, Typography, Divider, TextField } from "@material-ui/core";
import React, { useMemo } from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import countryList from "react-select-country-list";
import moment from "moment";
import { Action, State } from "../../../../Hooks/Reducers/UserReducer";
import AdapterMoment from "@material-ui/lab/AdapterMoment";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

const customStyles = {
  control: (base) => ({
    ...base,
    height: "4em",
    marginTop: "16px",
  }),
};

type Props = {
  user: State;
  dispatch: React.Dispatch<Action>;
};

const Form2 = ({ user, dispatch }: Props) => {
  const countries = useMemo(() => countryList().getData(), []);
  const handleDate = (value: Date) => {
    dispatch({ type: "DATE_CHANGE", payload: value });
  };

  const handleCountry = (value) => {
    dispatch({ type: "CHANGE", field: "country", payload: value.label });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">More Information</Typography>
        <Divider />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Phone Number</Typography>
        <TextField
          id="phone"
          name="phone"
          variant="filled"
          margin="normal"
          required
          color="primary"
          fullWidth
          label="Phone"
          value={user.phone}
          onChange={handleChange}
        />
        <Divider />
      </Grid>

      <Grid item xs={12} sm={6} style={{ marginTop: "16px" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Birthday"
            value={moment(user.birthday).format("l")}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Country</Typography>
        <Select
          options={countries}
          value={user.country != "" ? { value: "", label: user.country } : null}
          onChange={handleCountry}
          styles={customStyles}
          placeholder={"Country"}
          menuPlacement="top"
        />
        <Divider />
      </Grid>
    </>
  );
};

export default Form2;
