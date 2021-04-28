import React from "react";
import { GetProducts } from "components/FrontPage/GetProducts";
import webBanner from "images/WebBannerPNG.png";
import runningBackground from "images/runningBackground.jpg";
import Image from "next/image";
export const Discounts = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          maxHeight: "min(90vh, 750px)",
          width: "100%",
          backgroundColor: "#111111",
          position: "relative",
          paddingBottom: "min(56.25%, 750px)",
        }}
      >
        <div
          style={{
            clipPath: "circle(65% at 70% 50%)",
            height: "100%",
            position: "absolute",
            width: "80%",
            right: "0",
          }}
        >
          <Image src={runningBackground} layout="fill" objectFit="cover" />
        </div>
      </div>
      <GetProducts
        header={"Best Sellers discounts"}
        variables={{ discounted: true, sortBy: "sold" }}
      />

      <GetProducts
        header={"Newest Discounts"}
        variables={{ discounted: true }}
      />

      <GetProducts
        header={"Men's discounts"}
        variables={{ discounted: true, male: true }}
      />
      <GetProducts
        header={"Women's discounts"}
        variables={{ discounted: true, female: true }}
      />
    </div>
  );
};

export default Discounts;
