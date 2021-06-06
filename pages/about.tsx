import {
  Container,
  Box,
  Typography,
  Fade,
  IconButton,
  Slide,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import VisibilitySensor from "react-visibility-sensor";
import FlagIcon from "@material-ui/icons/Flag";
import HomeIcon from "@material-ui/icons/Home";
import { useState } from "react";
import DevList from "../Components/About/DevList";
import SingleDev from "../Components/About/SingleDev";
import Main from "../Components/About/Main";
import { Developers, Marketing, Finance } from "../utils/Options";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailIcon from "@material-ui/icons/Mail";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/">Canvas</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const About = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [visionActive, setVisionActive] = useState(false);
  const [missionActive, setMissionActive] = useState(false);
  const [teamActive, setTeamActive] = useState(false);
  const [CEOActive, setCEOActive] = useState(false);
  const [devActive, setDevActive] = useState(false);
  const [marketActive, setMarketActive] = useState(false);
  const [financeActive, setFinanceActive] = useState(false);
  const [publicActive, setPublicActive] = useState(false);
  const [humanActive, setHumanActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>About Us</title>
      </Head>
      <Link href="/home">
        <IconButton component="a">
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <Container>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Fade in={true} timeout={1500}>
            <Box display="flex" marginTop={4} marginBottom={4}>
              <Image src="/obra-logo.png" height={60} width={60} />
              <Typography
                variant="h3"
                align="center"
                gutterBottom
                style={{ marginTop: "8px", marginLeft: "8px" }}
              >
                Obra
              </Typography>
            </Box>
          </Fade>

          <Main
            changer={setAboutActive}
            active={aboutActive}
            title={"About"}
            description={`Our story began in 2020. Back then, we were only a handful of
            high school students with a diverse set of skills ranging from
            technology to arts (and even a combination of both), that were
            harnessed within our previous years. We were always thinking
            of ways to help promote local art given that it is a diverse
            and wonderful part of us Filipino’s culture. After thoughtful
            planning, we established Obra – an online art e-commerce
            platform for Filipinos, by Filipinos. We aim to give aspiring
            artists a platform to showcase their works of passion and
            talents to people of all kinds.`}
            fontSize={"h6"}
          />

          <Main
            changer={setVisionActive}
            active={visionActive}
            icon={<RemoveRedEyeIcon fontSize="large" />}
            title={"Vision"}
            description={`Our vision is an environment where Filipino artists’ Obra
            Maestra is widely proclaimed by Filipinos. That means
            providing every artist with an opportunity, and every customer
            satisfaction. We also yearn in the future that Obra isn’t seen
            as just a company that offers an e-commerce platform for
            selling and buying art. Instead, they’ll know that Obra is a
            canvas for Filipino artists to show their skills and talents
            in.`}
            fontSize={"h5"}
          />

          <Main
            changer={setMissionActive}
            active={missionActive}
            icon={<FlagIcon fontSize="large" />}
            title={"Mission"}
            description={`Obra’s mission is to render a canvas painted with
            opportunities for Filipino artists, where the arts are
            accessible, inclusive, and conveyed.`}
          />

          <VisibilitySensor
            onChange={(isVisible) => {
              setTeamActive(isVisible);
            }}
            partialVisibility={true}
          >
            <Box textAlign="center" marginBottom={12}>
              <Fade in={teamActive} timeout={2500}>
                <Typography
                  variant="h2"
                  gutterBottom
                  align="center"
                  style={{ marginBottom: "48px" }}
                >
                  Our Team
                </Typography>
              </Fade>
            </Box>
          </VisibilitySensor>

          <SingleDev
            changer={setCEOActive}
            active={CEOActive}
            name={"Armand Sotelo"}
            role={"CEO of Maestro"}
            image={"/Developers/Armand.jpg"}
            fb={"https://www.facebook.com/rmnd.jsph1"}
          />

          <DevList
            changer={setDevActive}
            List={Developers}
            active={devActive}
            teamName={"Web Developers"}
          />
          <DevList
            changer={setMarketActive}
            List={Marketing}
            active={marketActive}
            teamName={"Marketing Team"}
          />
          <DevList
            changer={setFinanceActive}
            List={Finance}
            active={financeActive}
            teamName={"Finance Team"}
          />

          <SingleDev
            changer={setPublicActive}
            active={publicActive}
            name={"Cristopher James Castillo"}
            role={"Public Relations Officer"}
            image={"/Developers/Castillo.jpg"}
            fb={"https://www.facebook.com/jamesycastillo"}
            twt={"https://twitter.com/jccastillo420"}
          />

          <SingleDev
            changer={setHumanActive}
            active={humanActive}
            name={"Darryl Javier"}
            role={"Human Relations Officer"}
            image={"/Developers/Darryl.jpg"}
            fb={"https://www.facebook.com/darryl.javier.5"}
            twt={"https://twitter.com/therealjavierr"}
          />

          <VisibilitySensor
            onChange={(isVisible) => {
              setContactActive(isVisible);
            }}
            partialVisibility={true}
          >
            <Box textAlign="center" marginBottom={18} marginTop={6}>
              <Fade in={contactActive} timeout={2500}>
                <Typography
                  variant="h2"
                  gutterBottom
                  align="center"
                  style={{ marginBottom: "48px" }}
                >
                  Contact Us
                </Typography>
              </Fade>

              <Slide in={contactActive} timeout={200} direction="up">
                <Box display="flex">
                  <Box marginLeft={4} marginRight={4}>
                    <Button component="a" startIcon={<MailIcon />}>
                      <Typography>ObraWeb@gmail.com</Typography>
                    </Button>
                  </Box>
                  <Box marginLeft={4} marginRight={4}>
                    <Button component="a" startIcon={<FacebookIcon />}>
                      <Typography>Obra</Typography>
                    </Button>
                  </Box>
                  <Box marginLeft={4} marginRight={4}>
                    <Button component="a" startIcon={<TwitterIcon />}>
                      <Typography>Obra_Website</Typography>
                    </Button>
                  </Box>
                </Box>
              </Slide>
            </Box>
          </VisibilitySensor>

          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default About;
