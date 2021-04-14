import {
  Dialog,
  Container,
  Toolbar,
  IconButton,
  Divider,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "../../pages/styles/Specific/Profile.module.css";
import CloseIcon from "@material-ui/icons/Close";
import Form from "./DrawerForms/Form";

const EditDrawer = ({ artist, setOpen, open }) => {
  const [user, setUser] = useState({
    name: artist.name,
    country: artist.country,
    birthday: artist.birthday,
    artLevel: artist.artLevel,
    artStyles: artist.artStyles,
    artKinds: artist.artKinds,
    userBio: artist.userBio ? artist.userBio : "",
    image: artist.image ? artist.image : "/user-empty-avatar.png",
    backdrop: artist.backdrop ? artist.backdrop : "/user-empty-backdrop.jpg",
    placeholder: artist.image ? artist.image : "/user-empty-avatar.png",
    backdropholder: artist.backdrop
      ? artist.backdrop
      : "/user-empty-backdrop.jpg",
  });

  const handleEditClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleEditClose}
        fullWidth
        maxWidth={"sm"}
        className={styles.dialog}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleEditClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Edit
          </Typography>
        </Toolbar>
        <Divider />
        <Container className={styles.container}>
          <Form id={artist.id} setOpen={setOpen} initState={user} />
        </Container>
      </Dialog>
    </>
  );
};

export default EditDrawer;
