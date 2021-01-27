
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
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>

          <div>
        <Header/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/store">
            <StorePage/>
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
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/">
            <FrontPage/>
          </Route>
        </Switch>
      </div>
      
      <Footer/>
    </Router>
      
      </div>
  );
}

export default App;
