import {
  Box,
  Typography,
  Grid,
  Grow,
  Button,
  Container,
} from "@material-ui/core";
import Image from "next/image";
import VisibilitySensor from "react-visibility-sensor";
import styles from "../../pages/styles/Specific/About.module.css";
import { Dispatch, SetStateAction } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useRouter } from "next/router";

type Object = {
  name: string;
  image: string;
  fb?: string;
  twt?: string;
};

type Props = {
  changer: Dispatch<SetStateAction<boolean>>;
  List: Object[];
  active: boolean;
  teamName: string;
};

const DevList = ({ changer, List, active, teamName }: Props) => {
  const router = useRouter();
  const handleSensor = (
    isVisible: boolean,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    setter(isVisible);
  };

  return (
    <>
      <VisibilitySensor
        onChange={(isVisible) => handleSensor(isVisible, changer)}
        partialVisibility={true}
      >
        <Box textAlign="center" marginBottom={12}>
          <Grow in={active} timeout={1000}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h4" gutterBottom>
                {teamName}
              </Typography>
              <Grid container spacing={2} className={styles.container}>
                {List.map((dev) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    className={styles.item}
                    key={dev.image}
                  >
                    <Container>
                      <Image
                        src={dev.image}
                        width={120}
                        height={120}
                        className={styles.avatar}
                      />
                      <Typography variant="h6">{dev.name}</Typography>
                      {dev.fb && (
                        <Button
                          component="a"
                          startIcon={<FacebookIcon />}
                          onClick={() => router.push(dev.fb)}
                        >
                          <Typography>Facebook Profile</Typography>
                        </Button>
                      )}
                      {dev.twt && (
                        <Button
                          component="a"
                          startIcon={<TwitterIcon />}
                          onClick={() => router.push(dev.twt)}
                        >
                          <Typography>Twitter Profile</Typography>
                        </Button>
                      )}
                    </Container>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grow>
        </Box>
      </VisibilitySensor>
    </>
  );
};

export default DevList;
