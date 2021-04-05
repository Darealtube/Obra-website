import {
  Grid,
  Select,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  Chip,
  Container,
} from "@material-ui/core";
import styles from "../../pages/styles/General/Configure.module.css";
import React from "react";
import moment from "moment";
import { useRouter } from "next/router";

const ConfigUser2 = ({
  setUser,
  user,
  prevPage,
  seterrMessage,
  setError,
  session,
  configUser,
}) => {
  const router = useRouter();
  const levelOptions = [
    "Professional Artist",
    "Freelancer",
    "Student",
    "Veteran",
  ];
  const styleOptions = [
    "Abstract Expressionism",
    "Art Deco",
    "Art Nouveau",
    "Avant-garde",
    "Baroque",
    "Bahaus",
    "Classicism",
    "Conceptual Art",
    "Constructivism",
    "Cubism",
    "Dada / Dadaism",
    "Expressionism",
    "Fauvism",
    "Futurism",
    "Impressionism",
    "Land Art",
    "Minimalism",
    "Neo - Impressionism",
    "Neoclassicism",
    "Post-Impressionism",
    "Surrealism",
    "Symbolism",
    "Other",
  ];

  const kindOptions = [
    "Sculpture",
    "Landscape Painting",
    "Portrait",
    "Oil Painting",
    "Digital Art",
    "8-Bit Art",
    "Fan Art",
  ];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser({
      ...user,
      [(event.target as HTMLInputElement)
        .name]: (event.target as HTMLInputElement).value as string,
    });
  };

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser({
      ...user,
      [(event.target as HTMLInputElement).name]: event.target.value as string[],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.artStyles.length > 5 || user.artStyles.length == 0) {
      setError(true);
      seterrMessage("Please enter no more than 5 Art Styles");
    } else if (user.artKinds.length > 5 || user.artKinds.length == 0) {
      setError(true);
      seterrMessage("Please enter no more than 5 Art Kinds");
    } else {
      configUser({
        variables: {
          userId: session?.id,
          name: user.name,
          age: user.age,
          country: user.country,
          language: user.language,
          birthday: moment(user.birthday).format("l"),
          phone: user.phone,
          artLevel: user.artLevel,
          artStyles: user.artStyles,
          artKinds: user.artKinds,
        },
      });
      router.push("/home");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography align="center">
              {" "}
              We will need additional information.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>What is your level of skill in Art?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="artLevel"
              value={user.artLevel}
              onChange={handleChange}
              fullWidth
              required
            >
              {levelOptions.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="art-style-label">
              What kind of Art are you great in doing?
            </InputLabel>
            <Select
              labelId="art-style-label"
              id="artStyles"
              name="artStyles"
              multiple
              value={user.artStyles}
              onChange={handleChange2}
              required
              renderValue={(selected) => (
                <Grid container style={{ maxHeight: "4em", overflow: "auto" }}>
                  {(selected as string[]).map((value, index) => (
                    <Grid item key={index}>
                      <Chip
                        key={value}
                        label={value}
                        className={styles.chips}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              fullWidth
            >
              {styleOptions.map((style) => (
                <MenuItem key={style} value={style}>
                  {style}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="art-kind-label">How do you do your art?</InputLabel>
            <Select
              labelId="art-kind-label"
              id="artKinds"
              name="artKinds"
              multiple
              required
              value={user.artKinds}
              onChange={handleChange2}
              renderValue={(selected) => (
                <Grid container style={{ maxHeight: "4em", overflow: "auto" }}>
                  {(selected as string[]).map((value, index) => (
                    <Grid item key={index}>
                      <Chip
                        key={value}
                        label={value}
                        className={styles.chips}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              fullWidth
            >
              {kindOptions.map((kind) => (
                <MenuItem key={kind} value={kind}>
                  {kind}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={prevPage}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default ConfigUser2;
