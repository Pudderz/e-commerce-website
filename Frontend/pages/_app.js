import "../styles/globals.css";
import React, { useRef, useEffect } from "react";
import "../styles/App.scss";
import  Header  from "../components/Common/Header";
import { Footer } from "../components/Common/Footer";
import { Auth0 } from "../components/Authentication/Auth0";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import * as gtag from "../utils/analytics";
import "../styles/productPages.scss";
import store from "../Redux/store";
import { Provider } from "react-redux";
import { loadState, saveState } from "../lib/localStorage";
import AuthApolloWrapper from "../components/Apollo/AuthApolloWrapper";
import {ErrorBoundary} from 'react-error-boundary'


function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}


function App({ Component, pageProps }) {
  // SnackBar Setup
  const notistackRef = useRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  
  // Persist redux data in localStorage
  useEffect(() => {
    console.log('grabbing state');
    let state = loadState();
    if(state !== undefined){
      store.dispatch({
        type:"UPDATE_CART",
        payload: {
          cart:state.cart.cart,
          cartInfo: state.cart.cartInfo
        }
      })
    }

    store.subscribe(() => {
      console.log(store.getState());
      saveState(store.getState())
    });


    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, [])

  // Google analytics
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Auth0>
          <AuthApolloWrapper>
              <SnackbarProvider
                maxSnack={3}
                ref={notistackRef}
                action={(key) => (
                  <Button
                    onClick={onClickDismiss(key)}
                    style={{ color: "white" }}
                  >
                    Dismiss
                  </Button>
                )}
              >
                  <div>
                    <Header />
                    <Component {...pageProps} />
                  </div>
              </SnackbarProvider>
            </AuthApolloWrapper>
        </Auth0>
      </Provider>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
