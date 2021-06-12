import { useEffect } from "react";
import { start, done } from "nprogress";
import "nprogress/nprogress.css";
import router from "next/router";
import "./styles/patch.css";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";

// This is the progress bar you see when routing to different pages.
// These are fired during routing events.
router.events.on("routeChangeStart", () => start());
router.events.on("routeChangeComplete", () => done());
router.events.on("routeChangeError", () => done());

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
