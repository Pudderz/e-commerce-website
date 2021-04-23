import React from "react";
import { GetProducts } from "components/FrontPage/GetProducts";
import webBanner from "images/WebBannerPNG.png";
export const Discounts = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
        <img src={webBanner} alt="" />
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
