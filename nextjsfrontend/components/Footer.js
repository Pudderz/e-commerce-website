import React from "react";
import Link from 'next/link'
export const Footer = () => {
  return (

 
      <footer className="grid"style={{ maxWidth: "100%", position: "sticky", padding: "50px 0", top:'100%'   }}>
        <hr
          style={{ maxWidth: "1300px", margin: "24px auto 0" }}
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
          <Link className="link" href="/">Home</Link>
          <Link className="link" href="/store">About</Link>
          <Link className="link" href="/findastore">Find a Store</Link>
          <Link className="link" href="/store">Products</Link>
        </div>
      </footer>
    
  );
};
