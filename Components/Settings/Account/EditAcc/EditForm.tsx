import { Grid } from "@material-ui/core";
import React, { useContext, useReducer } from "react";
import { UserInterface } from "../../../../interfaces/UserInterface";
import { UserContext } from "../../../../Components/Settings/SettingsWrap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { DataProxy, useMutation } from "@apollo/client";
import { EDIT_USER_MUTATION } from "../../../../apollo/apolloQueries";
import { EditUserData } from "../../../../interfaces/MutationInterfaces";
import { reducer, State } from "../../../../Hooks/Reducers/UserReducer";
import Form1 from "./Form1";
import Form3 from "./Form3";
import Form2 from "./Form2";
import { userValidator } from "../../../../utils/userValidator";
import dynamic from "next/dynamic";
import { editUserUpdate } from "../../../../utils/update";

const DynamicSnack = dynamic(
  () => import("../../../Forms/Snackbars/ConfigSnack")
);

const EditForm = () => {
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
    artStyles: user.artStyles,
    artKinds: user.artKinds,
    userBio: user.userBio ? user.userBio : "",
    image: user.image ? user.image : "/user-empty-avatar.png",
    backdrop: user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg",
    placeholder: user.image ? user.image : "/user-empty-avatar.png",
    backdropholder: user.backdrop ? user.backdrop : "/user-empty-backdrop.jpg",
    error: false,
    errMessage: "",
  };
  const [userData, dispatch] = useReducer(reducer, initState);
  const [editUser] = useMutation<EditUserData>(EDIT_USER_MUTATION, {
    update: (cache: DataProxy, mutationResult) =>
      editUserUpdate(cache, mutationResult, session?.id),
  });

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
    const valid = await userValidator(userData, session?.id);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
    } else {
      editUser({
        variables: {
          userId: session?.id,
          name: userData.name,
          country: userData.country,
          birthday: userData.birthday,
          artLevel: userData.artLevel,
          artStyles: userData.artStyles,
          artKinds: userData.artKinds,
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

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <Grid container spacing={4}>
          <Form1 user={userData} dispatch={dispatch} />
          <Form3 user={userData} dispatch={dispatch} />
          <Form2 user={userData} dispatch={dispatch} />
        </Grid>
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
