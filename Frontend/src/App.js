
import React, {useRef} from 'react'
import './App.css';
import { StorePage } from './pages/StorePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ProductPage } from './Template/ProductPage';
import { FindAStore } from './pages/FindAStore';
import { FrontPage } from './pages/FrontPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Basket } from './pages/Basket';
import { Profile } from './pages/Profile';
import { Auth0 } from './components/Auth0';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import { CartContextProvider } from './context/CartContext';
import { CategoryPage } from './pages/CategoryPage';

function App() {


  const notistackRef = useRef();
  const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}
  return (
    <div className="App">
      <Router>
        <Auth0>
          <SnackbarProvider maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)} style={{color:'white'}}>
                Dismiss
            </Button>
        )}
          >
            <CartContextProvider>
               <div>
        <Header/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/store">
            <StorePage/>
          </Route>
          <Route path="/category">
            <CategoryPage/>
          </Route>
          <Route path="/product">
            <ProductPage/>
          </Route>
          <Route path="/findastore">
            <FindAStore/>
          </Route>
          <Route path="/basket">
            <Basket/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/">
            <FrontPage/>
          </Route>
        </Switch>
      </div>
            </CartContextProvider>

         
      </SnackbarProvider>
        </Auth0>
      
      <Footer/>
    </Router>
      
      </div>
  );
}

export default App;
