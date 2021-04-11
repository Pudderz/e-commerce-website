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
          margin: "50px 0 0",
          justifyContent: "space-around",
        }}
      >
        <div style={{ alignSelf: "center", margin: "0 auto" }}>
          <h3 style={{ color: "#fff", fontSize: "30px" }}>
            Sign Up For Our Newsletter
          </h3>
          <div className="signUpButtons">
            <TextField
              type="email"
              placeholder="Email"
              variant="outlined"
              id="emailSignUpInput"
            ></TextField>
            <Button id="emailSignUpButton">Sign Up</Button>
          </div>
          <div
            style={{
              margin: "50px auto",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {/* <h4 style={{ color: "#fff", fontSize: "30px", margin:'0' }}>
            or Connect with us
          </h4> */}

            <a href="">
              <InstagramIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="">
              <TwitterIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="">
              <FacebookIcon fontSize="large" style={{ color: "white" }} />
            </a>
          </div>
        </div>
      </div>
      <footer
        className="grid"
        style={{
          maxWidth: "100%",
          position: "sticky",
          padding: "50px 0 0",
          top: "100%",
          backgroundColor:'rgb(17,17,17)',
           color: "#fefefe",
          minHeight: "400px",
        }}
      >
        <div
          className="flexFooter"
        
        >
          <div
          
          >
            <h3>Pages</h3>
            <Link className="link" href="/">
              Home
            </Link>
            <Link className="link" href="/store">
              Store page
            </Link>
            <Link className="link" href="/men">
              Men HomePage
            </Link>
            <Link className="link" href="/women">
              Women Homepage
            </Link>
            <Link className="link" href="/discount">
              Discount page
            </Link>
          
          </div>
          <div
           
          >
            <h3>External Pages</h3>
            <a href="https://github.com/Pudderz">Github</a>
            <a href="www.matthewpudney.co.uk" >Portfolio</a>
          </div>

          <div
          
          >
            <h3>Contact Me</h3>
            <p style={{margin:'0'}}>mpudney2@gmail.com</p>
          </div>
        </div>
        <div
        className="subFooter"
      
        >
          <p>E-Commerce Site</p>
          <div
            
          >
            <p>Terms & Conditions</p>
            <p>Security policy</p>
            <p>Return policy</p>
          </div>
        </div>
      </footer>
    </>
  );
};
