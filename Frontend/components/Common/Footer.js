import React from "react";
import Link from "next/link";
import { Button, TextField } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
export const Footer = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#314869",
          height: "400px",
          width: "100%",
          display: "flex",
          flexFlow: "column",
          margin:'50px 0 0',
          justifyContent: "space-around",
        }}
      >
        <div style={{ alignSelf: "center", margin: "0 auto" }}>
          <h3 style={{ color: "#fff", fontSize: "30px" }}>
            Sign Up For Our Newsletter
          </h3>
          <div
            style={{
              display: "flex",
              gap: "5px",
              margin: "auto",
              width: "fit-content",
            }}
          >
            <TextField
              type="email"
              placeholder="Email"
              variant="outlined"
              id="emailSignUpInput"
            ></TextField>
            <Button id="emailSignUpButton">Sign Up</Button>
          </div>
          <div style={{margin:'50px auto', display:'flex', gap:'20px', justifyContent:'center'}}>
          {/* <h4 style={{ color: "#fff", fontSize: "30px", margin:'0' }}>
            or Connect with us
          </h4> */}
            <InstagramIcon fontSize="large" style={{color:'white'}}/>
            <TwitterIcon fontSize="large" style={{color:'white'}}/>
            <FacebookIcon fontSize="large" style={{color:'white'}}/>
          </div>
        </div>
      </div>
      <footer
        className="grid"
        style={{
          maxWidth: "100%",
          position: "sticky",
          padding: "50px 0",
          top: "100%",
          backgroundColor: "#111111",
          color: "white",
          height: "400px",
        }}
      >
        <hr style={{ maxWidth: "1300px", margin: "24px auto 0" }} />

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
            boxSizing: "border-box",
          }}
        >
          <Link className="link" href="/">
            Home
          </Link>
          <Link className="link" href="/store">
            About
          </Link>
          <Link className="link" href="/findastore">
            Find a Store
          </Link>
          <Link className="link" href="/store">
            Products
          </Link>
        </div>
      </footer>
    </>
  );
};
