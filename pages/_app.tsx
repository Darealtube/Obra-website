import { useEffect } from "react";
import { start, done } from "nprogress";
import "../public/nprogress.css";
import { useRouter } from "next/router";
import "./styles/patch.css";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";
import AppWrap from "../Components/Appbar/AppWrap";

const defaultWrap = (page) => <AppWrap>{page}</AppWrap>;

/* 
   Every page is defaultly wrapped with the Appbar/SideBar to apply the SPA feel in our website, making it look a little bit faster. 
   For pages with additional wraps, there should be a getwrap function added to the page component in order for it to be applied (see
   settings page or commissions page for example). For pages without wraps, it is necesarry to add a getwrap function WITHOUT the 
   <AppWrap></AppWrap> Component. The other wraps Apollo Provider and Session (Provider) are for the cache of both user and session, at
   the same time enabling caching serverside and static side.
*/

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps);
  const getWrap = Component.getWrap || defaultWrap;
  useEffect(() => {
    const handleRouteStart = () => {
      start();
    };
    const handleRouteEnd = () => {
      done();
    };
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);
    router.events.on("routeChangeError", handleRouteEnd);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
      router.events.off("routeChangeError", handleRouteEnd);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        {getWrap(<Component {...pageProps} />)}
      </Provider>
    </ApolloProvider>
  );
}
