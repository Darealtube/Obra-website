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
