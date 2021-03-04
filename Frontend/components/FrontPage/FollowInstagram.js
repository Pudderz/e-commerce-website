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
import Image from "next/image";

export const FollowInstagram = () => {
  return (
    <div style={{ minHeight: "600px", maxWidth: "100%" }}>
      <h3 style={{ margin: "80px 0 15px" }}>
        Follow us on instagram for more updates
      </h3>
      <Link href="https://www.instagram.com/">Follow us</Link>

      <div
        className="pictureContainer"
        style={{
          display: "flex",
          margin: "50px auto",
          width: "fit-content",
          gap: "50px",
          maxWidth: "100%",
          flexFlow: "wrap",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Image
          src={mountainRun}
          alt="man running happing on a mountain path"
          height={200}
          width={300}
          style={{ flexGrow: "1", maxHeight: "500px", objectFit: "cover" }}
        />
        <Image
          src={hikingBackground}
          alt="person standing on a rock looking on at the mountains in the distance"
          width={300}
          height={200}
          style={{ flexGrow: "1", maxHeight: "500px", objectFit: "cover" }}
        />
        <Image
          src={dog}
          alt="dog looking curious at the camera"
          width={300}
          height={200}
          style={{ flexGrow: "1", maxHeight: "500px", objectFit: "cover" }}
        />
        <Image
          src={shoesInWater}
          alt="shoes jumping in a puddle"
          width={300}
          height={200}
          style={{ flexGrow: "1", maxHeight: "500px", objectFit: "cover" }}
        />
        <Image
          src={hikingBackground2}
          alt="pair of hiking shoes on a cliff egde"
          width={300}
          height={200}
          style={{ flexGrow: "1", maxHeight: "500px", objectFit: "cover" }}
        />
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
