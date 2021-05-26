import {
  Typography,
  Grid,
  Divider,
  Collapse,
  Container,
} from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../SettingsWrap";

const SecondaryInfo = ({ open }: { open: boolean }) => {
  const user = useContext(UserContext);
  return (
    <>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ width: "100%" }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <br />
              <Divider />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="h6">Age</Typography>
              <Typography variant="body1">
                {user.age ? user.age : "Unknown"}
              </Typography>
              <br />
              <Divider />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="h6">Birthday</Typography>
              <Typography variant="body1">
                {user.birthday ? user.birthday : "Unknown"}
              </Typography>
              <br />
              <Divider />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="h6">Country</Typography>
              <Typography variant="body1">
                {user.country ? user.country : "Unknown"}
              </Typography>
              <br />
              <Divider />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">
                {user.phone ? user.phone : "Unknown"}
              </Typography>
              <br />
              <Divider />
            </Grid>
          </Grid>
        </Container>
      </Collapse>
    </>
  );
};

export default SecondaryInfo;
