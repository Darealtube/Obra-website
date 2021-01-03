import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "next/router";

router.events.on("routeChangeStart", () => NProgress.start());
router.events.on("routeChangeComplete", () => NProgress.done());
router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
