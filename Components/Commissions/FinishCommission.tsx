import {
  Grid,
  Collapse,
  Typography,
  TextField,
  CircularProgress,
  IconButton,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import { useRef, useState } from "react";
import useArt from "../../Hooks/useArt";
import styles from "../../pages/styles/Specific/Commission.module.css";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { useRouter } from "next/router";
import { FinishCommissionVars } from "../../interfaces/MutationInterfaces";

const FinishCommission = ({
  open,
  commissionId,
  finishCommission,
}: {
  open: boolean;
  commissionId: string;
  finishCommission: (
    options?: MutationFunctionOptions<boolean, FinishCommissionVars>
  ) => Promise<FetchResult<boolean, Record<string, any>, Record<string, any>>>;
}) => {
  const router = useRouter();
  const artFile = useRef<HTMLInputElement>();
  const [images, setImages] = useState({
    finishedArt: "",
    finishedwatermarkArt: "",
  });
  const [message, setMessage] = useState("");
  const { loading, setArt, placeholder } = useArt("/user-empty-backdrop.jpg");
  const [disabled, setDisabled] = useState(false);

  const handleArt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length != 0) {
      setDisabled(true);
      setArt((e.target as HTMLInputElement).files).then((values) => {
        setImages({
          finishedArt: values.url,
          finishedwatermarkArt: values.watermarkUrl,
        });
        setDisabled(false);
      });
    }
  };

  const handleArtClick = () => {
    artFile.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDisabled(true);
    finishCommission({
      variables: {
        commissionId: commissionId,
        finishedArt: images.finishedArt,
        finishedwatermarkArt: images.finishedwatermarkArt,
        message: message,
      },
    });
    router.push("/commissions/");
  };

  return (
    <Grid item xs={12}>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ width: "100%", height: "20vh" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8} className={styles.finishedArt}>
              {!loading ? (
                <>
                  <Image
                    src={placeholder}
                    layout="fill"
                    objectFit="cover"
                    alt={"Commission Finished Art Placeholder"}
                  />
                  <IconButton onClick={handleArtClick}>
                    <PhotoCameraIcon />
                  </IconButton>
                </>
              ) : (
                <CircularProgress />
              )}
              <input
                onChange={handleArt}
                type="file"
                id="file"
                ref={artFile}
                style={{ display: "none" }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Leave a Message</Typography>
              <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                id="messsage"
                label="Messsage"
                name="messsage"
                color="primary"
                rows={8}
                multiline={true}
                rowsMax={12}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="outlined" disabled={disabled}>
                Finish Commission
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </Grid>
  );
};

export default FinishCommission;
