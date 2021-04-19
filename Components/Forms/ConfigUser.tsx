import { Grid, TextField, Button, Typography } from "@material-ui/core";
import styles from "../../pages/styles/General/Configure.module.css";
import React from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Action, State } from "../../Hooks/Reducers/ConfigReducer";

type Props = {
  handleCalendar: (event: React.MouseEvent<HTMLButtonElement>) => void;
  user: State;
  dispatch: React.Dispatch<Action>;
  selectStyle: {
    control: (base: any) => any;
  };
  countries: { value: string; label: string }[];
};

const ConfigUser = ({
  handleCalendar,
  user,
  dispatch,
  countries,
  selectStyle,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  const handleCountry = (value) => {
    dispatch({
      type: "COUNTRY_CHANGE",
      payload: value.label,
      payload2: value.value,
    });
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (+user.age <= 0 || +user.age > 100 || !Number.isInteger(+user.age)) {
      dispatch({
        type: "ERROR",
        payload: true,
        message: "Entered age is invalid. Please change it.",
      });
    } else if (
      +user.phone.length < 11 ||
      +user.phone.length > 11 ||
      !Number.isInteger(+user.age)
    ) {
      dispatch({
        type: "ERROR",
        payload: true,
        message: "Entered phone number is invalid. Please change it.",
      });
    } else {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleNext}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center">
            {" "}
            We will need additional information.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            margin="normal"
            required
            id="name"
            label="Username"
            name="name"
            color="primary"
            fullWidth
            value={user.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} style={{ marginTop: "16px" }}>
          <Button
            onClick={handleCalendar}
            className={styles.birthday}
            fullWidth
            color="primary"
            variant="contained"
          >
            {` Birthday:
  
                  ${moment(user.birthday).format("MM/DD/YYYY")}
                  
                  `}
          </Button>
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="filled"
            margin="normal"
            required
            id="age"
            label="Age"
            name="age"
            color="primary"
            fullWidth
            value={user.age}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Select
            options={countries}
            value={
              (user.country && user.language) != ""
                ? { value: user.language, label: user.country }
                : null
            }
            onChange={handleCountry}
            styles={selectStyle}
            placeholder={"Country"}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="filled"
            margin="normal"
            required
            id="lang"
            label="Language"
            name="lang"
            color="primary"
            fullWidth
            value={user.language}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="filled"
            margin="normal"
            required
            id="phone"
            label="Phone"
            name="phone"
            color="primary"
            value={user.phone}
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConfigUser;
