import React from "react";
import { RecentProducts } from "components/FrontPage/RecentProducts";
import webBanner from "images/WebBannerPNG.png";
export const Discounts = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
        <img src={webBanner} alt="" />
      </div>

      <RecentProducts
        header={"Best Sellers discounts"}
        variables={{ discounted: true, sortBy: "sold" }}
      />

      <RecentProducts
        header={"Newest Discounts"}
        variables={{ discounted: true }}
      />

      <RecentProducts
        header={"Men's discounts"}
        variables={{ discounted: true, male: true }}
      />
      <RecentProducts
        header={"Women's discounts"}
        variables={{ discounted: true, female: true }}
      />
    </div>
  );
};

export default Discounts;
