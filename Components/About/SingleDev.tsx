import { Container, Box, Typography, Grow, Button } from "@material-ui/core";
import Image from "next/image";
import VisibilitySensor from "react-visibility-sensor";
import styles from "../../pages/styles/Specific/About.module.css";
import { Dispatch, SetStateAction } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useRouter } from "next/router";

type Props = {
  changer: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  name: string;
  role: string;
  image: string;
  fb?: string;
  twt?: string;
};

const SingleDev = ({ changer, active, role, image, name, fb, twt }: Props) => {
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
                {role}
              </Typography>
              <Container>
                <Image
                  src={image}
                  width={180}
                  height={180}
                  className={styles.avatar}
                />
                <Typography variant="h6">{name}</Typography>
                {fb && (
                  <Button
                    component="a"
                    startIcon={<FacebookIcon />}
                    onClick={() => router.push(fb)}
                  >
                    <Typography>Facebook Profile</Typography>
                  </Button>
                )}
                {twt && (
                  <Button
                    component="a"
                    startIcon={<TwitterIcon />}
                    onClick={() => router.push(twt)}
                  >
                    <Typography>Twitter Profile</Typography>
                  </Button>
                )}
              </Container>
            </Box>
          </Grow>
        </Box>
      </VisibilitySensor>
    </>
  );
};

export default SingleDev;
