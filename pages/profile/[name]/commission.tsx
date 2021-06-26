import { Paper, CssBaseline } from "@material-ui/core";
import styles from "../../styles/Specific/Commission.module.css";
import Image from "next/image";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMISSION_MUTATION } from "../../../apollo/apolloQueries";
import { useRouter } from "next/router";
import CommissionForm from "../../../Components/Commissions/CommissionForm";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const initState = {
  title: "",
  description: "",
  sampleArt: "",
  height: 0,
  width: 0,
  deadline: 3,
};

const DynamicNotAllowedDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoAccessDialog")
);
const DynamicNoSessDialog = dynamic(
  () => import("../../../Components/MainPopovers/NoSessionDialog")
);

const Commission = () => {
  const [session, loading] = useSession();
  const [notAllowed, setnotAllowed] = useState(false);
  const [noSess, setnoSess] = useState(false);
  const router = useRouter();
  const [commissionArtist] = useMutation(CREATE_COMMISSION_MUTATION);
  const [commission, setCommission] = useState(initState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commissionArtist({
      variables: {
        artistName: name,
        userId: session?.id,
        title: commission.title,
        description: commission.description,
        width: +commission.width,
        height: +commission.height,
        deadline: commission.deadline,
        sampleArt: commission.sampleArt,
      },
    });
    router.push("/");
  };

  useEffect(() => {
    if (!session && !loading) {
      setnoSess(true);
    }

    if (!noSess && !loading && session?.user.name == router.query.name) {
      setnotAllowed(true);
    }
  }, [session, router, loading, noSess]);

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Commission {router.query.name}</title>
      </Head>
      <CssBaseline />
      <Image
        src="https://picsum.photos/600"
        alt="Scenery image"
        layout="fill"
        objectFit="cover"
        objectPosition="center left"
      />
      <Paper elevation={6} className={styles.paper}>
        {!notAllowed && !noSess && !loading && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <CommissionForm
              commission={commission}
              setCommission={setCommission}
              name={router.query.name as string}
            />
          </form>
        )}
      </Paper>
      <DynamicNotAllowedDialog open={notAllowed} />
      <DynamicNoSessDialog open={noSess} />
    </div>
  );
};

export default Commission;
