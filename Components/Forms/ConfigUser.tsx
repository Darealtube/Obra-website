import { Grid, TextField, Button, Typography } from "@material-ui/core";
import styles from "../../pages/styles/General/Configure.module.css";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Action, State } from "../../Hooks/Reducers/ConfigReducer";
import { UserValidate1 } from "../../utils/userValidator";
import { useSession } from "next-auth/client";
import countryList from "react-select-country-list";
import dynamic from "next/dynamic";

type Props = {
  user: State;
  dispatch: React.Dispatch<Action>;
};

const customStyles = {
  control: (base) => ({
    ...base,
    height: "4em",
    marginTop: "16px",
  }),
};

const DynamicDate = dynamic(() => import("../MainPopovers/DatePopover"));

const ConfigUser = ({ user, dispatch }: Props) => {
  const [session] = useSession();
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const countries: { value: string; label: string }[] = useMemo(
    () => countryList().getData(),
    []
  );

  const handleDate = (value: Date) => {
    dispatch({ type: "DATE_CHANGE", payload: value });
    setdateAnchor(null);
  };

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

  // handleNext first validates the first set of requirements like the age, etc.
  // Then it moves on to the next page where the submit button is.
  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = await UserValidate1(user, session?.id);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
    } else {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  const handleCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdateAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setdateAnchor(null);
  };

  return (
    <>
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
              styles={customStyles}
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
      <DynamicDate
        dateAnchor={dateAnchor}
        handleClose={handleCalendarClose}
        handleDate={handleDate}
        initValue={user.birthday}
      />
    </>
  );
};

export default ConfigUser;
