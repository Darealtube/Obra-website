import { useEffect } from "react";
import { start, done } from "nprogress";
import "../public/nprogress.css";
import { useRouter } from "next/router";
import "./styles/patch.css";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";
import SettingsWrap from "../Components/Settings/SettingsWrap";
import AppWrap from "../Components/Appbar/AppWrap";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps);
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

  if (router.pathname.startsWith("/settings/")) {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider session={pageProps.session}>
          <SettingsWrap>
            <Component {...pageProps} />
          </SettingsWrap>
        </Provider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <AppWrap>
          <Component {...pageProps} />
        </AppWrap>
      </Provider>
    </ApolloProvider>
  );
}
