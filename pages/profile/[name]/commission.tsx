import { Paper, Grid, Box, useMediaQuery, Button } from "@material-ui/core";
import styles from "../../styles/Specific/Commission.module.css";
import Image from "next/image";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import CommissionForm from "../../../Components/Commissions/CommissionForm";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import { USER_COMM_INFO_QUERY } from "../../../apollo/Queries/userQueries";
import { AppContext } from "../../../Components/Appbar/AppWrap";

const DynamicNotAllowedDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoAccessDialog")
);
const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);
const DynamicPosterDialog = dynamic(
  () => import("../../../Components/PostInfo/PostDialogs/ImageDialog")
);

const Commission = () => {
  const Small = useMediaQuery("(max-width: 960px)");
  const drawerOpen = useContext(AppContext);
  const [session, loading] = useSession();
  const [notAllowed, setnotAllowed] = useState(false);
  const [noSess, setnoSess] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const router = useRouter();
  const { data } = useQuery<UserData, QueryNameVars>(USER_COMM_INFO_QUERY, {
    variables: {
      name: router.query.name as string,
    },
    skip: !router.query.name,
  });

  useEffect(() => {
    if (!session && !loading) {
      setnoSess(true);
    }

    if (!noSess && !loading && session?.user.name == router.query.name) {
      setnotAllowed(true);
    }
  }, [session, router, loading, noSess]);

  const handlePosterOpen = () => {
    setPosterOpen(true);
  };

  const handlePosterClose = () => {
    setPosterOpen(false);
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission {router.query.name}</title>
      </Head>
      <Image
        src="https://picsum.photos/600"
        alt="Scenery image"
        layout="fill"
        objectFit="cover"
        objectPosition="center left"
      />

      <Grid
        container
        spacing={2}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          backgroundColor: "black",
        }}
      >
        <Grid
          item
          xs={12}
          md={drawerOpen ? 12 : 6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper elevation={6} className={styles.paper}>
            {!notAllowed && !noSess && !loading && data?.userName && (
              <CommissionForm
                name={router.query.name as string}
                commissionRates={data?.userName.commissionRates}
              />
            )}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={drawerOpen ? 12 : 6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!Small ? (
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              height="80vh"
              zIndex={100}
              position="relative"
            >
              {data?.userName && (
                <Image
                  src={data?.userName.commissionPoster}
                  layout="fill"
                  objectFit="contain"
                  alt={"Commission Poster"}
                  onClick={handlePosterOpen}
                />
              )}
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePosterOpen}
            >
              Show {router.query.name}&apos;s Commission Poster
            </Button>
          )}
        </Grid>
      </Grid>

      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
      <DynamicPosterDialog
        open={posterOpen}
        handleClose={handlePosterClose}
        art={data?.userName.commissionPoster}
      />
    </div>
  );
};

export default Commission;
