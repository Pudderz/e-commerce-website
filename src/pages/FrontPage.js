import React from "react";
import { RecentlyViewed } from "../components/RecentlyViewed";

//Home Page

//Featured Section/Banner section

// Top Products

// Instagram Section

// categories section

export const FrontPage = () => {
  return (
    <div>
      <div style={{ backgroundColor: "grey", height: "600px", width: "100%" }}>
        Banner
      </div>
      <div style={{ backgroundColor: "#eee", height: "500px", width: "100%" }}>
        Featured products
      </div>
      <div style={{ backgroundColor: "#fff", height: "500px", width: "100%" }}>
        Categories Section
        <div style={{ display: "flex", justifyContent: "space-around", margin:'20px 0' }}>
          <div
            style={{ backgroundColor: "#ddd", height: "400px", width: "250px" }}
          >
            Running
          </div>
          <div
            style={{ backgroundColor: "#ddd", height: "400px", width: "250px", marginTop:'20px' }}
          >
            Casual
          </div>
          <div
            style={{ backgroundColor: "#ddd", height: "400px", width: "250px" }}
          >
            Hiking
          </div>
        </div>
      </div>
          <RecentlyViewed/>

    </div>
  );
};
