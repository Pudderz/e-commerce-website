import React from "react";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import webBanner from "../images/WebBannerPNG.png";
export const Discounts = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
           <img src={webBanner} alt="" />
      </div>
      
     
      <div>
        <h3>Best Sellers discounts</h3>
        <hr/>
      </div>
      <div>
        <h3>Newest discounts</h3>
        <hr/>
        <RecentProducts/>
      </div>
      <div>
        <h3>Men discounts</h3>
        <hr/>
        <RecentProducts/>
      </div>
      <div>
        <h3>Women discounts</h3>
        <hr/>
        <RecentProducts/>
      </div>
    </div>
  );
};

export default Discounts;
