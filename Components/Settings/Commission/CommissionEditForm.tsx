import React, { useContext, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useState } from "react";
import dynamic from "next/dynamic";
import useArt from "../../../Hooks/useArt";
import {
  MutationFunctionOptions,
  OperationVariables,
  FetchResult,
} from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { UserInterface } from "../../../interfaces/UserInterface";
import { UserContext } from "../SettingsWrap";
import RemoveIcon from "@material-ui/icons/Remove";

const DynamicAddRowDialog = dynamic(() => import("./AddRowDialog"));

type Props = {
  editCommSettings: (
    options?: MutationFunctionOptions<any, OperationVariables>
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};

const CommSettingsEditForm = ({ editCommSettings }: Props) => {
  const inputFile = useRef<HTMLInputElement>();
  const user: UserInterface = useContext(UserContext);
  const router = useRouter();
  const [session] = useSession();
  const [rows, setRows] = useState(
    user.commissionRates.map(({ __typename, ...item }) => item)
  );
  const [commissionPoster, setCommissionPoster] = useState(
    user.commissionPoster ? user.commissionPoster : ""
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { loading, setArt, placeholder } = useArt(
    user.commissionPoster ? user.commissionPoster : "/user-empty-backdrop.jpg"
  );

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddRow = ({ type, price }) => {
    setRows([
      ...rows,
      {
        type,
        price,
      },
    ]);
  };

  const handleDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newrows = rows.filter((_row, index) => index != +e.currentTarget.value);
    setRows(newrows);
  };

  const handleArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setDisableSubmit(true)
      setArt((e.target as HTMLInputElement).files).then((values) => {
        setCommissionPoster(values.url);
        setDisableSubmit(false)
      });
    }
  };

  const handleArtClick = () => {
    inputFile.current.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSubmit(true);
    editCommSettings({
      variables: {
        userId: session?.id,
        commissionPoster: commissionPoster,
        commissionRates: rows,
      },
    });
    router.push("/settings/commissionInfo/");
  };

  return <>
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        style={{ display: "flex", marginTop: "8px" }}
      >
        <Grid item xs={12} md={6}>
          <Typography gutterBottom align="center" variant="h4">
            Commission Poster
          </Typography>
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            {!loading ? (
              <>
                <Image
                  src={placeholder}
                  layout="fill"
                  objectFit="contain"
                  alt={"Commission Poster Placeholder"}
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
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleArt}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom align="center" variant="h4">
            Commission Rates
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Type of Art</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.type}>
                    <TableCell align="center">
                      <IconButton value={index} onClick={handleDeleteRow} size="large">
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    <IconButton onClick={handleOpenDialog} size="large">
                      <AddRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="outlined" type="submit" disabled={disableSubmit}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
    <DynamicAddRowDialog
      open={addDialogOpen}
      handleCloseDialog={handleCloseDialog}
      handleAddRow={handleAddRow}
    />
  </>;
};

export default CommSettingsEditForm;
