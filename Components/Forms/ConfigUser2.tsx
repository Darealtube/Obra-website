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
import { useSession } from "next-auth/client";
import { Action, State } from "../../Hooks/Reducers/ConfigReducer";
import {
  MutationFunctionOptions,
  OperationVariables,
  FetchResult,
} from "@apollo/client";
import { levelOptions, styleOptions, kindOptions } from "../../utils/Options";
import { UserValidate2 } from "../../utils/userValidator";

type Props = {
  configUser: (
    options?: MutationFunctionOptions<any, OperationVariables>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  user: State;
  dispatch: React.Dispatch<Action>;
};

const ConfigUser2 = ({ dispatch, user, configUser }: Props) => {
  const router = useRouter();
  const [session] = useSession();
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({
      type: "CHANGE",
      field: (e.target as HTMLInputElement).name,
      payload: (e.target as HTMLInputElement).value,
    });
  };

  // handleSubmit will also handle form validation that is coded by
  // Darryl Javier. Please contribute to the validation algorithm for
  // more.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = UserValidate2(user);
    if (valid.error && valid.errMessage) {
      dispatch({
        type: "ERROR",
        payload: valid.error,
        message: valid.errMessage,
      });
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

  const prevPage = () => {
    dispatch({ type: "PREVIOUS_PAGE" });
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
              onChange={handleChange}
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
              onChange={handleChange}
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
