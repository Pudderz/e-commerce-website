import '../styles/globals.css'
import React, { useRef } from "react";
import "../App.scss";
import { Header } from "../components/Common/Header";
import { Footer } from "../components/Common/Footer";
import { Auth0 } from "../components/Authentication/Auth0";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { CartContextProvider } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink,concat, from} from "@apollo/client"; 
import {onError} from '@apollo/client/link/error'


const errorLink = onError(({graphqlErrors,networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      alert(`Graphlql Error ${message}`);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri:'http://localhost:6969/graphql'}),
])

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization:(localStorage.getItem('token'))? `Bearer ${localStorage.getItem('token')}` : null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
})


const promise = loadStripe("pk_test_51ICSvvEduQoHI0PkPXFpVekvFm9fDb84KUYGy9CGtFlm1b6ZzjZ1Z9mVWaBEPIFvo3uQInuowX2KcEAbBANuqzeV00N77MhPiW");


function MyApp({ Component, pageProps }) {
  const notistackRef = useRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Auth0>
        <ApolloProvider
          client={client}
        >
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)} style={{ color: "white" }}>
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
        </ApolloProvider>
      </Auth0>

      <Footer />
  </div>
  )
}

export default MyApp
