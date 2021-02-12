import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div style={{ maxWidth: "100%", position: "relative" }}>
 
      <footer className="grid">
        <hr
          style={{ maxWidth: "100%", maxWidth: "1300px", margin: "24px auto 0" }}
        />

        <div
          className="flexFooter"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1300px",
            margin: "auto",
            padding: "10px",
            flexWrap: "wrap",
            boxSizing:'border-box'
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/store">About </Link>
          <Link to="/findastore">Find a Store</Link>
          <Link to="/store">Products</Link>
        </div>
      </footer>
    </div>
  );
};
