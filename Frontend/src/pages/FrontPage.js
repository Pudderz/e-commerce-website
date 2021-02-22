import React, { useEffect } from "react";
import { RecentlyViewed } from "../components/RecentlyViewed";
import hikingBackground from "../images/hikingBackground.jpg";
import { MostPopular } from "../components/MostPopular";
import { RecentProducts } from "../components/RecentProducts";
import { Link } from "react-router-dom";
import { FollowInstagram } from "../components/FollowInstagram";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import { Categories } from "../components/FrontPage/Categories";

//Home Page

//Featured Section/Banner section

// Top Products

// Instagram Section

// categories section

export const FrontPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <img
          src={hikingBackground}
          alt="hikingShoes"
          height="100%"
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            width: "100%",
            objectFit: "cover",
            left: "0",
          }}
        />
        Banner
      </div>
      <MostPopular />

      {/* Category Selection */}
      <Categories />
      <div
      className="highlights"
    
      >
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <LocalShippingIcon style={{ fontSize: 70 }} />
          </div>
          <h3>Next day delivery in the uk</h3>
          <p>If you order before 3pm</p>
        </div>
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <PaymentIcon style={{ fontSize: 70 }} />
          </div>
          <h3>30 day return refund</h3>
          <p>
            Did't not get the right size or colour. 30 days refund no questions
            asked.
          </p>
        </div>
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <PaymentIcon style={{ fontSize: 70 }} />
          </div>
          <h3>24/7 Customer Support</h3>
          <p></p>
        </div>
      </div>
      <RecentProducts />

      <Link to="/store">Explore more</Link>

      <FollowInstagram />

      <RecentlyViewed />
    </div>
  );
};
