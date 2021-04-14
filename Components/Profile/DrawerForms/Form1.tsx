import styles from "../../../pages/styles/General/Configure.module.css";
import {
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useMemo, useRef } from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import countryList from "react-select-country-list";
import moment from "moment";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Action, State } from "../../../Hooks/Reducers/UserReducer";
import useArt from "../../../Hooks/useArt";
import dynamic from "next/dynamic";

const DynamicDate = dynamic(() => import("../../DatePopover"));

const customStyles = {
  control: (base) => ({
    ...base,
    height: "4em",
    marginTop: "16px",
  }),
};

const Form1 = ({
  user,
  dispatch,
}: {
  user: State;
  dispatch: React.Dispatch<Action>;
}) => {
  const [dateAnchor, setdateAnchor] = useState<null | HTMLElement>(null);
  const inputFile = useRef<HTMLInputElement>();
  const inputFile2 = useRef<HTMLInputElement>();
  const countries = useMemo(() => countryList().getData(), []);
  const { loading, setArt, placeholder } = useArt(user.placeholder);
  const {
    loading: backdropLoading,
    setArt: setBackdrop,
    placeholder: backdrop,
  } = useArt(user.backdropholder);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

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

  const handleAvatarClick = () => {
    inputFile.current.click();
  };

  const handleBackdropClick = () => {
    inputFile2.current.click();
  };

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setArt((e.target as HTMLInputElement).files).then((values) => {
      dispatch({
        type: "CHANGE",
        field: "image",
        payload: values.url,
      });
    });
  };

  const handleBackdrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackdrop((e.target as HTMLInputElement).files).then((values) => {
      dispatch({
        type: "CHANGE",
        field: "backdrop",
        payload: values.url,
      });
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Box
          width={1}
          height="100%"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!backdropLoading ? (
            <>
              <Image src={backdrop} layout="fill" objectFit="cover" />
              <IconButton onClick={handleBackdropClick}>
                <PhotoCameraIcon />
              </IconButton>
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <input
          onChange={handleBackdrop}
          type="file"
          id="file"
          ref={inputFile2}
          style={{ display: "none" }}
        />
        <Box
          width={140}
          height={140}
          position="relative"
          bottom={100}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!loading ? (
            <>
              <Image
                src={placeholder}
                layout="fill"
                objectFit="contain"
                className={styles.avatar}
              />
              <IconButton onClick={handleAvatarClick}>
                <PhotoCameraIcon />
              </IconButton>
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <input
          onChange={handleArt}
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="name"
          name="name"
          variant="filled"
          margin="normal"
          required
          color="primary"
          fullWidth
          label="Username"
          value={user.name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="userBio"
          label="Bio"
          name="userBio"
          color="primary"
          variant="outlined"
          margin="none"
          required
          fullWidth
          rows={4}
          inputProps={{ maxLength: 400 }}
          multiline={true}
          rowsMax={4}
          value={user.userBio}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        style={{ marginTop: "16px" }}
      >
        <Button
          onClick={handleCalendar}
          className={styles.birthday}
          fullWidth
          color="primary"
          variant="contained"
        >
          {` Birthday:
  
                  ${moment(user.birthday).format("l")}
                  
                  `}
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Select
          options={countries}
          value={user.country != "" ? { value: "", label: user.country } : null}
          onChange={handleCountry}
          styles={customStyles}
          placeholder={"Country"}
        />
      </Grid>

      <DynamicDate
        handleClose={handleCalendarClose}
        handleDate={handleDate}
        dateAnchor={dateAnchor}
        initValue={moment(user.birthday).toDate()}
      />
    </>
  );
};

export default Form1;
