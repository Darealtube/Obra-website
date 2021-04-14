import { Grid, Select, MenuItem, InputLabel, Chip } from "@material-ui/core";
import styles from "../../../pages/styles/General/Configure.module.css";
import React from "react";
import { Action, State } from "../../../Hooks/Reducers/UserReducer";

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

const Form2 = ({
  user,
  dispatch,
}: {
  user: State;
  dispatch: React.Dispatch<Action>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", field: e.target.name, payload: e.target.value });
  };

  return (
    <>
      <Grid item xs={12}>
        <InputLabel>Art Level</InputLabel>
        <Select
          value={user.artLevel}
          name="artLevel"
          fullWidth
          required
          onChange={handleChange}
        >
          {levelOptions.map((level, index) => (
            <MenuItem key={index} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={12}>
        <InputLabel id="art-style-label">Art Styles</InputLabel>
        <Select
          onChange={handleChange}
          value={user.artStyles}
          name="artStyles"
          multiple
          required
          renderValue={(selected) => (
            <Grid container style={{ maxHeight: "4em", overflow: "auto" }}>
              {(selected as string[]).map((value, index) => (
                <Grid item key={index}>
                  <Chip key={value} label={value} className={styles.chips} />
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
        <InputLabel id="art-kind-label">Art Kinds</InputLabel>
        <Select
          onChange={handleChange}
          value={user.artKinds}
          name="artKinds"
          multiple
          required
          renderValue={(selected) => (
            <Grid container style={{ maxHeight: "4em", overflow: "auto" }}>
              {(selected as string[]).map((value, index) => (
                <Grid item key={index}>
                  <Chip key={value} label={value} className={styles.chips} />
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
    </>
  );
};

export default Form2;
