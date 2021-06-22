import {
  Grid,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useRef } from "react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Action, State } from "../../../../Hooks/Reducers/UserReducer";
import useArt from "../../../../Hooks/useArt";
import styles from "../../../../pages/styles/General/Settings.module.css";

type Props = {
  user: State;
  dispatch: React.Dispatch<Action>;
};

const Form1 = ({ user, dispatch }: Props) => {
  const inputFile = useRef<HTMLInputElement>();
  const inputFile2 = useRef<HTMLInputElement>();
  const { loading, setArt, placeholder } = useArt(user.placeholder);
  const {
    loading: backdropLoading,
    setArt: setBackdrop,
    placeholder: backdrop,
  } = useArt(user.backdropholder);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

  const handleAvatarClick = () => {
    inputFile.current.click();
  };

  const handleBackdropClick = () => {
    inputFile2.current.click();
  };

  // handleArt uses the setArt custom hook developed by Darryl Javier. Go to the
  // file in the hooks directory in order to know more about the custom hook.
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
      <Grid item xs={12} className={styles.backdrop}>
        {!backdropLoading ? (
          <>
            <Image src={backdrop} layout="fill" objectFit="cover" alt={"Backdrop Image"} />
            <IconButton onClick={handleBackdropClick}>
              <PhotoCameraIcon />
            </IconButton>
          </>
        ) : (
          <CircularProgress />
        )}
        <input
          onChange={handleBackdrop}
          type="file"
          id="file"
          ref={inputFile2}
          style={{ display: "none" }}
        />
      </Grid>

      <Grid item xs={6} sm={2} className={styles.dp}>
        {!loading ? (
          <>
            <Image
              src={placeholder}
              layout="fill"
              objectFit="contain"
              className={styles.avatar}
              alt={"User Image Placeholder"}
            />
            <IconButton onClick={handleAvatarClick}>
              <PhotoCameraIcon />
            </IconButton>
          </>
        ) : (
          <CircularProgress />
        )}
        <input
          onChange={handleArt}
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
      </Grid>
      <Grid item xs={6} sm={10}>
        <Button type="submit" variant="outlined" style={{ float: "right" }}>
          Save
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Username</Typography>
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
        <br />
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Bio</Typography>
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
        <br />
        <Divider />
      </Grid>
    </>
  );
};

export default Form1;
