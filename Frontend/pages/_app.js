import "../styles/globals.css";
import React, { useRef, useEffect } from "react";
import "../App.scss";
import  Header  from "../components/Common/Header";
import { Footer } from "../components/Common/Footer";
import { Auth0 } from "../components/Authentication/Auth0";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { CartContextProvider } from "../context/CartContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useRouter } from "next/router";
import * as gtag from "../utils/analytics";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/productPages.scss";
import { createUploadLink } from "apollo-upload-client";
import store from "../Redux/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { loadState, saveState } from "../lib/localStorage";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`Graphlql Error ${message}`);
    });
  }
});

// const link = from([
//   errorLink,
//   new HttpLink({uri:`${process.env.BACKEND_SERVER}/graphql`}),
// ])

const link = createUploadLink({ uri: `${process.env.BACKEND_SERVER}/graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization: localStorage?.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
});

function App({ Component, pageProps }) {
  // SnackBar Setup
  const notistackRef = useRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };



  
// Persist redux data in localStorage
  useEffect(() => {
    console.log('grabbing state')
    let state = loadState();
    console.log(state);
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

    return () => {  
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
      <Provider store={store}>
        <Auth0>
          <ApolloProvider client={client}>
            <AuthContextProvider>
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
                <CartContextProvider>
                  <div>
                    <Header />
                    <Component {...pageProps} />
                  </div>
                </CartContextProvider>
              </SnackbarProvider>
            </AuthContextProvider>
          </ApolloProvider>
        </Auth0>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
