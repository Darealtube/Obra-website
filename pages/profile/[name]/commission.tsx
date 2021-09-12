import {
  Grid,
  CircularProgress,
  IconButton,
  Container,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";
import styles from "../../styles/Specific/Commission.module.css";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useContext, useReducer, useRef, useState } from "react";
import { useRouter } from "next/router";
import CommissionForm from "../../../Components/Commissions/CommissionForm";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "@apollo/client";
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import { USER_COMM_INFO_QUERY } from "../../../apollo/Queries/userQueries";
import { AppContext } from "../../../Components/Appbar/AppWrap";
import { CREATE_COMMISSION_MUTATION } from "../../../apollo/Mutations/commsMutations";
import { CommissionArtistVars } from "../../../interfaces/MutationInterfaces";
import { commReducer } from "../../../Hooks/Reducers/CommissionReducer";
import Image from "next/image";
import useArt from "../../../Hooks/useArt";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const DynamicNotAllowedDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoAccessDialog")
);
const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);
const DynamicPosterDialog = dynamic(
  () => import("../../../Components/PostInfo/PostDialogs/ImageDialog")
);

const initState = {
  title: "",
  description: "",
  sampleArt: "",
  height: 0,
  width: 0,
  deadline: 3,
  price: [],
  rates: [],
  submitDisabled: false,
  deadlineDisabled: false,
};

const Commission = () => {
  const [commissionArtist] = useMutation<boolean, CommissionArtistVars>(
    CREATE_COMMISSION_MUTATION
  );
  const inputFile = useRef<HTMLInputElement>();
  const {
    loading: artLoading,
    setArt,
    placeholder,
  } = useArt("/user-empty-backdrop.jpg");
  const [commission, dispatch] = useReducer(commReducer, initState);
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

  const togglePoster = () => {
    setPosterOpen(!posterOpen);
  };

  const handleArtClick = () => {
    inputFile.current.click();
  };

  const handleArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      dispatch({
        type: "TOGGLE_DISABLE",
        disableField: "submitDisabled",
        payload: true,
      });
      setArt((e.target as HTMLInputElement).files).then((values) => {});
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let selectedRates = commission.price.map((rate) => rate.split(" - "));
    let prices = selectedRates.map((price) => +price[1]);
    let finalPrice = prices.reduce((a, b) => a + b);
    let finalRates = selectedRates.map((rate) => rate[0]);
    dispatch({
      type: "TOGGLE_DISABLE",
      disableField: "submitDisabled",
      payload: true,
    });
    commissionArtist({
      variables: {
        artistName: router.query.name as string,
        userId: session?.id,
        title: commission.title,
        description: commission.description,
        width: +commission.width,
        height: +commission.height,
        deadline: commission.deadline,
        sampleArt: commission.sampleArt,
        price: finalPrice,
        rates: finalRates,
      },
    });
    router.push("/");
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission {router.query.name}</title>
      </Head>

      <Container sx={{ height: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            md={drawerOpen ? 12 : 6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!notAllowed && !noSess && !loading && data?.userName && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <CommissionForm
                  name={router.query.name as string}
                  commissionRates={data?.userName.commissionRates}
                  commission={commission}
                  dispatch={dispatch}
                />
              </form>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={drawerOpen ? 12 : 6}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Typography variant="h4">Sample Art</Typography>
            <Divider />
            <Box
              sx={{
                height:"100%",
                background: `url(${placeholder}) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                sx={{
                  backdropFilter: "blur(5px)",
                }}
              >
                {!artLoading ? (
                  <>
                    <Image
                      src={placeholder}
                      layout="fill"
                      objectFit="contain"
                      alt={"Art Commission Placeholder"}
                    />
                    <IconButton onClick={handleArtClick} size="large">
                      <PhotoCameraIcon />
                    </IconButton>
                  </>
                ) : (
                  <CircularProgress />
                )}
                <input
                  type="file"
                  id="sampleArt"
                  name="sampleArt"
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={handleArt}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* <Container sx={{ height: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={drawerOpen ? 12 : 6} xl={6}>
            {!notAllowed && !noSess && !loading && data?.userName && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <CommissionForm
                  name={router.query.name as string}
                  commissionRates={data?.userName.commissionRates}
                  commission={commission}
                  dispatch={dispatch}
                />
              </form>
            )}
          </Grid>
          <Grid
            item
            xs={drawerOpen ? 12 : 6}
            md={6}
            sx={{
              display: "flex",
              flexDirection:"column"
            }}
          >
            <Typography variant="h4">Sample Art</Typography>
            <Divider />
            <Box
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              {!artLoading ? (
                <>
                  <Image
                    src={placeholder}
                    layout="fill"
                    objectFit="cover"
                    alt={"Art Commission Placeholder"}
                  />
                  <IconButton onClick={handleArtClick} size="large">
                    <PhotoCameraIcon />
                  </IconButton>
                </>
              ) : (
                <CircularProgress />
              )}
              <input
                type="file"
                id="sampleArt"
                name="sampleArt"
                style={{ display: "none" }}
                ref={inputFile}
                onChange={handleArt}
              />
            </Box>
          </Grid>
        </Grid>
      </Container> */}

      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
      <DynamicPosterDialog
        open={posterOpen}
        handleClose={togglePoster}
        art={data?.userName.commissionPoster}
      />
    </>
  );
};

export default Commission;
