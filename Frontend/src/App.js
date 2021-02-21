import React, { useRef } from "react";
import "./App.scss";
import { StorePage } from "./pages/StorePage";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ProductPage } from "./Template/ProductPage";
import { FindAStore } from "./pages/FindAStore";
import { FrontPage } from "./pages/FrontPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Basket } from "./pages/Basket";
import { Profile } from "./pages/Profile";
import { Auth0 } from "./components/Auth0";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { CartContextProvider } from "./context/CartContext";
import { CategoryPage } from "./pages/CategoryPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Checkout } from "./pages/Checkout";
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




function App() {
  const notistackRef = useRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Router>
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
                {/*<Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/store">
                    <StorePage />
                  </Route>
                  <Route path="/category">
                    <CategoryPage />
                  </Route>
                  <Route path="/product">
                    <ProductPage />
                  </Route>
                  <Route path="/findastore">
                    <FindAStore />
                  </Route>
                  <Route path="/basket">
                    <Basket />
                  </Route>
                  <Route path="/checkout">
                    <Elements stripe={promise}>
                      <Checkout />
                    </Elements>
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/">
                    <FrontPage />
                  </Route>
                </Switch>
              </div>
            </CartContextProvider>
          </SnackbarProvider>
          </ApolloProvider>
        </Auth0>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
