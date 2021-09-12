import { Typography, useMediaQuery } from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserandPosts } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { getSession } from "next-auth/client";
import ProfileWrap, {
  UserWrapContext,
} from "../../../Components/Profile/ProfileWrap";
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";
import ArtList from "../../../Components/ArtList";
import { useTheme } from "@material-ui/core";
import { USER_POST_QUERY } from "../../../apollo/Queries/userQueries";
import { useContext } from "react";
import AppWrap, { AppContext } from "../../../Components/Appbar/AppWrap";

type Props = {
  name: string;
};

const UserID = ({ name }: Props) => {
  const drawerOpen = useContext(AppContext);
  const galleryView = useContext(UserWrapContext);
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const lgmd = useMediaQuery(`(min-width: 900px) and (max-width: 1100px)`);
  const mobile = useMediaQuery(`(max-width: 900px)`);
  const sm = useMediaQuery(`(min-width: 782px) and (max-width: 899px)`);
  const xs = useMediaQuery(`(max-width: 599px)`);

  const drawerOpenColumns = xl ? 3 : lgmd ? 1 : 2;
  const drawerClosedColumns = lg || xl ? 3 : 2;
  const mobileColumns = sm ? 3 : xs ? 1 : 2;

  const artListColumns = !mobile
    ? (drawerOpen && galleryView) || !drawerOpen
      ? drawerClosedColumns
      : drawerOpenColumns
    : mobileColumns;

  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, QueryNameVars>(USER_POST_QUERY, {
    variables: {
      name,
      limit: 20,
    },
  });

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{name}</title>
      </Head>
      {userName ? (
        <>
          <ArtList
            data={userName.posts}
            fetchMore={fetchMore}
            first={"userName"}
            second={"posts"}
            columns={artListColumns}
          />
        </>
      ) : (
        <Typography variant="h5">
          This user has been deleted, or has changed their name.
        </Typography>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, exists } = await fetchUserandPosts(
    context.params.name as string,
    session ? session.id : null
  );

  if (!exists) {
    return {
      notFound: true,
    };
  }

  return addApolloState(data, {
    props: {
      session,
      name: context.params.name,
    },
  });
};

UserID.getWrap = function wrap(page) {
  return (
    <AppWrap>
      <ProfileWrap>{page}</ProfileWrap>
    </AppWrap>
  );
};

export default UserID;
