import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useReducer } from "react";
import { UserInterface } from "../../../../interfaces/UserInterface";
import { UserContext } from "../../../../Components/Settings/SettingsWrap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { reducer, State } from "../../../../Hooks/Reducers/UserReducer";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { userValidator } from "../../../../utils/userValidator";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import useArt from "../../../../Hooks/useArt";
import styles from "../../../../pages/styles/General/Settings.module.css";
import { useRef } from "react";
import InfoForm from "./InfoForm";

const DynamicSnack = dynamic(
  () => import("../../../Forms/Snackbars/ConfigSnack")
);

const EditForm = ({ editUser }: { editUser: any }) => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const backdropRef = useRef<HTMLInputElement>();
  const avatarRef = useRef<HTMLInputElement>();
  const [disabled, setDisabled] = useState(false);
  const [disabledWhileArt, setDisabledWhileArt] = useState(false);
  const [session] = useSession();
  const user: UserInterface = useContext(UserContext);
  const router = useRouter();
  const initState: State = {
    name: user.name,
    phone: user.phone,
    age: user.age,
    country: user.country,
    birthday: user.birthday,
    artLevel: user.artLevel,
    userBio: user.userBio ? user.userBio : "",
    image: user.image ? user.image : "/user-empty-avatar.png",
    backdrop: user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg",
    placeholder: user.image ? user.image : "/user-empty-avatar.png",
    backdropholder: user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg",
    error: false,
    errMessage: "",
  };
  const [userData, dispatch] = useReducer(reducer, initState);
  const { loading, setArt, placeholder } = useArt(userData.placeholder);
  const {
    loading: backdropLoading,
    setArt: setBackdrop,
    placeholder: backdrop,
  } = useArt(userData.backdropholder);

  const handleErrorClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "ERROR", payload: false });
  };

  // handleEditSubmit will first validate the form before submitting it
  // to edit. This is a cache mutation, meaning that the next time you view
  // the post, it is sure to be updated.
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const valid = await userValidator(userData, session?.id);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
      setDisabled(false);
    } else {
      editUser({
        variables: {
          userId: session?.id,
          name: userData.name,
          country: userData.country,
          birthday: userData.birthday,
          artLevel: userData.artLevel,
          userBio: userData.userBio,
          image: userData.image,
          phone: userData.phone,
          age: userData.age,
          backdrop: userData.backdrop,
        },
      });
      router.push(`/settings/account/`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

  const handleAvatarClick = () => {
    avatarRef.current.click();
  };

  const handleBackdropClick = () => {
    backdropRef.current.click();
  };

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setDisabledWhileArt(true);
      setArt((e.target as HTMLInputElement).files).then((values) => {
        dispatch({
          type: "CHANGE",
          field: "image",
          payload: values.url,
        });
      });
    }
  };

  const handleBackdrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setDisabledWhileArt(true);
      setBackdrop((e.target as HTMLInputElement).files).then((values) => {
        dispatch({
          type: "CHANGE",
          field: "backdrop",
          payload: values.url,
        });
        setDisabledWhileArt(false);
      });
    }
  };

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <Box className={styles.backdrop}>
          {!backdropLoading ? (
            <>
              <Image
                src={backdrop}
                layout="fill"
                objectFit="cover"
                alt={"Backdrop Image"}
              />
              <IconButton onClick={handleBackdropClick} size="large">
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
            ref={backdropRef}
            style={{ display: "none" }}
          />
        </Box>

        <Grid container spacing={lg ? 2 : 1}>
          <Grid item xs={12} sx={{ position: "relative", bottom: "40px" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {!loading ? (
                <>
                  <Image
                    src={placeholder}
                    width={120}
                    height={120}
                    className={styles.avatar}
                    alt={"User Image Placeholder"}
                  />
                  <IconButton
                    onClick={handleAvatarClick}
                    size="large"
                    sx={{ position: "absolute" }}
                  >
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
                ref={avatarRef}
                style={{ display: "none" }}
              />
            </Box>

            <TextField
              id="name"
              name="name"
              variant="standard"
              margin="normal"
              required
              color="primary"
              fullWidth
              placeholder="Username"
              value={userData.name}
              onChange={handleChange}
              inputProps={{
                style: {
                  fontSize: "1.17em",
                  textAlign: "center",
                  fontWeight: "bolder",
                },
              }}
            />
            <Divider />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              id="userBio"
              label="Bio"
              name="userBio"
              color="primary"
              variant="outlined"
              margin="none"
              required
              fullWidth
              rows={lg ? 4 : 8}
              inputProps={{ maxLength: 400 }}
              multiline={true}
              value={userData.userBio}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8} className={styles.userInfo}>
            <InfoForm user={userData} dispatch={dispatch} />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{ marginTop: "8px" }}
          variant="outlined"
          type="submit"
          disabled={disabled || disabledWhileArt}
        >
          Save
        </Button>
      </form>
      <DynamicSnack
        error={userData.error}
        errMessage={userData.errMessage}
        handleErrorClose={handleErrorClose}
      />
    </>
  );
};

export default EditForm;
