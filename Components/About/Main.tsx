import { Box, Typography, Fade } from "@material-ui/core";
import VisibilitySensor from "react-visibility-sensor";
import { Dispatch, SetStateAction } from "react";

type Props = {
  changer: Dispatch<SetStateAction<boolean>>;
  icon?: any;
  active: boolean;
  title: string;
  description: string;
  fontSize?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
};

const Main = ({
  changer,
  active,
  icon,
  title,
  description,
  fontSize,
}: Props) => {

  // handleSensor accepts a dispatch and a result from VisibilitySensor as its
  // parameters. It sets state from another component.
  const handleSensor = (
    isVisible: boolean,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    setter(isVisible);
  };

  return (
    <>
    {/* Visibility Sensor will sense if the element is within the user's viewpoint or not. If it is on
        the viewpoint, it will activate the Fade effect. */}
      <VisibilitySensor
        onChange={(isVisible) => handleSensor(isVisible, changer)}
        partialVisibility={true}
      >
        <Box textAlign="center" marginBottom={8}>
          <Fade in={active} timeout={1500}>
            <Typography
              variant="h2"
              gutterBottom
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
              {title}
            </Typography>
          </Fade>
          <Fade in={active} timeout={1000}>
            <Typography variant={fontSize ? fontSize : "h4"} align="center">
              {description}
            </Typography>
          </Fade>
        </Box>
      </VisibilitySensor>
    </>
  );
};

export default Main;
