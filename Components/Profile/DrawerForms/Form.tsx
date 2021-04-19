import { Grid, Button } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import Form1 from "../DrawerForms/Form1";
import Form2 from "../DrawerForms/Form2";
import {
  EDIT_USER_MUTATION,
  UserInfo,
  UserInfo2,
} from "../../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { reducer, State } from "../../../Hooks/Reducers/UserReducer";
import { useRouter } from "next/router";
import { EditUserData } from "../../../interfaces/MutationInterfaces";

type Props = {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initState: State;
};

const Form = ({ id, setOpen, initState }: Props) => {
  const router = useRouter();
  const [user, dispatch] = useReducer(reducer, initState);
  const [editUser] = useMutation<EditUserData>(EDIT_USER_MUTATION, {
    update: (cache, mutationResult) => {
      const newUser = mutationResult.data.editUser;
      cache.writeFragment({
        id: `User:${id}`, // The value of the to-do item's unique identifier
        fragment: UserInfo,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
      cache.writeFragment({
        id: `User:${id}`, // The value of the to-do item's unique identifier
        fragment: UserInfo2,
        data: {
          backdrop: newUser.backdrop,
          userBio: newUser.userBio,
          birthday: newUser.birthday,
          country: newUser.country,
          phone: newUser.phone,
          artLevel: newUser.artLevel,
          artStyles: newUser.artStyles,
          artKinds: newUser.artKinds,
        },
      });
    },
  });

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editUser({
      variables: {
        userId: id,
        name: user.name,
        country: user.country,
        birthday: user.birthday,
        artLevel: user.artLevel,
        artStyles: user.artStyles,
        artKinds: user.artKinds,
        userBio: user.userBio,
        image: user.image,
        backdrop: user.backdrop,
      },
    });
    setOpen(false);
    router.push(`/profile/${encodeURIComponent(user.name)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <Grid container spacing={4}>
          <Form1 user={user} dispatch={dispatch} />
          <Form2 user={user} dispatch={dispatch} />
          <Grid item xs={12}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
