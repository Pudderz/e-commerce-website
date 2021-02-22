import React from "react";
import mountainRun from "../../images/mountainRun.jpg";
import hikingBackground from "../../images/hikingBackground.jpg";
import dog from "../../images/dog.jpg";
import shoesInWater from "../../images/shoesInWater.jpg";
import hikingBackground2 from "../../images/hikingBackground2.jpg";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Link } from "@material-ui/core";

export const FollowInstagram = () => {
  return (
    <div style={{ minHeight: "600px",maxWidth:'100%' }}>
      <h3 style={{ margin: "80px 0 15px" }}>
        Follow us on instagram for more updates
      </h3>
      <Link href="https://www.instagram.com/">Follow us</Link>

      <div
        style={{
          display: "flex",
          margin: "50px auto",
          width: "fit-content",
          gap: "50px",
          maxWidth:'100%',
          flexFlow:'wrap',
          justifyContent:'center',
          padding:'20px',
          boxSizing:'border-box'
          
        }}
      >
        <img src={mountainRun} alt="" width="272px" style={{flexGrow:'1', maxHeight:'500px', objectFit:'cover'}}/>
        <img src={hikingBackground} width="272px" style={{flexGrow:'1', maxHeight:'500px', objectFit:'cover'}} alt="" />
        <img src={dog} width="272px" alt="" style={{flexGrow:'1', maxHeight:'500px', objectFit:'cover'}}/>
        <img src={shoesInWater} width="272px" style={{flexGrow:'1', maxHeight:'500px', objectFit:'cover'}} alt="" />
        <img src={hikingBackground2} width="272px" style={{flexGrow:'1', maxHeight:'500px', objectFit:'cover'}} alt="" />
      </div>
      <h3 style={{ margin: "80px 0 15px" }}>
        Or connect with us on social media
      </h3>
      <InstagramIcon fontSize="large" /> 
      <TwitterIcon fontSize="large" />
      <FacebookIcon fontSize="large" />
    </div>
  );
};
