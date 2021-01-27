import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
/* 
HEADER COMPONENT


Location Page (Links to Map showing shops nearby)

Profile button (goes to login in page if not signed in)

Basket Button showing num of items in Basket (onClick goes to basket page)

*/

export const Header = () => {
  return (
    <div style={{position:'sticky', top:'0', backgroundColor:'#fff', padding:'10px 0', margin:'0'}}>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-around",
            margin:'0'
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/findastore">Find a Nearby Store</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <li>
                <input type="checkbox" />
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/basket">Basket</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
