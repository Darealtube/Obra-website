import {
  Grid,
  Button,
  Typography,
  Divider,
  TextField,
} from "@material-ui/core";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import countryList from "react-select-country-list";
import moment from "moment";
import { Action, State } from "../../../../Hooks/Reducers/UserReducer";
import dynamic from "next/dynamic";
import styles from "../../../../pages/styles/General/Configure.module.css";

const DynamicDate = dynamic(() => import("../../../MainPopovers/DatePopover"));

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
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const countries = useMemo(() => countryList().getData(), []);
  const handleDate = (value: Date) => {
    setdateAnchor(null);
    dispatch({ type: "DATE_CHANGE", payload: value });
  };

  const handleCountry = (value) => {
    dispatch({ type: "CHANGE", field: "country", payload: value.label });
  };

  const handleCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdateAnchor(event.currentTarget);
  };

  const handleCalendarClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdateAnchor(null);
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
        <Typography variant="h6">Birthday</Typography>
        <Button
          onClick={handleCalendar}
          className={styles.birthday}
          fullWidth
          color="primary"
          variant="contained"
        >
          {user.birthday ? moment(user.birthday).format("l") : "No Birthday"}
        </Button>
        <Divider />
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

      <DynamicDate
        handleClose={handleCalendarClose}
        handleDate={handleDate}
        dateAnchor={dateAnchor}
        initValue={
          user.birthday ? moment(user.birthday).toDate() : moment().toDate()
        }
      />
    </>
  );
};

export default Form2;
