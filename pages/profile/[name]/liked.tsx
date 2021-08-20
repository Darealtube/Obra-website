import Appbar from "../../../Components/Appbar/Appbar";
import {
  CssBaseline,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
import styles from "../../styles/Specific/Profile.module.css";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUserandLikedPosts } from "../../../utils/fetchData";
import { useQuery } from "@apollo/client";
import { USER_LIKED_POST_QUERY } from "../../../apollo/apolloQueries";
import { getSession } from "next-auth/client";
import ProfileWrap from "../../../Components/Profile/ProfileWrap";
import ArtList from "../../../Components/ArtList";
import { QueryNameVars, UserData } from "../../../interfaces/QueryInterfaces";
import { addApolloState } from "../../../apollo/apolloClient";
import { useState } from "react";
import router from "next/router";

type Props = {
  name: string;
  id: string;
  alreadyLiked: boolean;
  currentPage: string;
};

const UserIDLiked = ({ name, id, alreadyLiked, currentPage }: Props) => {
  const [tabsValue, setTabsValue] = useState(currentPage);
  const theme = useTheme();
  const threeCol1 = useMediaQuery(theme.breakpoints.up("lg"));
  const threeCol2 = useMediaQuery("(max-width: 899px) and (min-width: 768px)");
  const oneCol = useMediaQuery("(max-width: 515px)");
  const {
    data: { userName },
    fetchMore,
  } = useQuery<UserData, QueryNameVars>(USER_LIKED_POST_QUERY, {
    variables: {
      name: name,
      limit: 20,
    },
  });

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
    router.push(newValue);
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Liked</title>
      </Head>
      <CssBaseline />
      <Appbar />
      <ProfileWrap
        artist={userName}
        admin={userName?.id == id}
        userLiked={alreadyLiked}
      >
        <Box className={styles.postContainer}>
          {userName ? (
            <>
              <Box justifyContent="center" alignItems="center" marginBottom={8}>
                <Tabs value={tabsValue} onChange={handleTabChange}>
                  <Tab label="Posts" value={`/profile/${name}/`} />
                  <Tab
                    label="Liked Posts"
                    value={`/profile/${name}/liked`}
                  />
                </Tabs>
              </Box>
              <ArtList
                data={userName.likedPosts}
                fetchMore={fetchMore}
                first={"userName"}
                second={"likedPosts"}
                columns={threeCol1 || threeCol2 ? 3 : oneCol ? 1 : 2}
              />
            </>
          ) : (
            <Typography variant="h5">
              This user has been deleted, or has changed their name.
            </Typography>
          )}
        </Box>
      </ProfileWrap>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data, exists, alreadyLiked } = await fetchUserandLikedPosts(
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
      id: session ? session.id : null,
      alreadyLiked: alreadyLiked,
      currentPage: `/profile/${context.params.name}/liked`,
    },
  });
};

export default UserIDLiked;
