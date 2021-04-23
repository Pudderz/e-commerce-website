import React from "react";
import Link from "next/link";
import { Button, TextField } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import {
  SignUpContainer,
  SubFooter,
  FooterContainer,
  FooterContent,
  SignUpInputs,
  SocialLinks,
} from "./Footer.styles";

export const Footer = () => {
  return (
    <>
      <SignUpContainer>
        <div>
          <h3 style={{ color: "#fff", fontSize: "30px" }}>
            Sign Up For Our Newsletter
          </h3>
          <SignUpInputs>
            <TextField
              type="email"
              placeholder="Email"
              variant="outlined"
              id="emailSignUpInput"
            ></TextField>
            <Button id="emailSignUpButton">Sign Up</Button>
          </SignUpInputs>

          <SocialLinks>
            <a href="">
              <InstagramIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="">
              <TwitterIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="">
              <FacebookIcon fontSize="large" style={{ color: "white" }} />
            </a>
          </SocialLinks>
        </div>
      </SignUpContainer>

      <FooterContainer>
        <FooterContent>
          <div>
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
          <div>
            <h3>External Pages</h3>
            <a href="https://github.com/Pudderz">Github</a>
            <a href="www.matthewpudney.co.uk">Portfolio</a>
          </div>

          <div>
            <h3>Contact Me</h3>
            <p style={{ margin: "0" }}>mpudney2@gmail.com</p>
          </div>
        </FooterContent>
        <SubFooter>
          <p>E-Commerce Site</p>
          <div>
            <p>Terms & Conditions</p>
            <p>Security policy</p>
            <p>Return policy</p>
          </div>
        </SubFooter>
      </FooterContainer>
    </>
  );
};


export default Footer;