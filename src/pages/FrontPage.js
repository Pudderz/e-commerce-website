import React, {useEffect} from "react";
import { RecentlyViewed } from "../components/RecentlyViewed";
import runningImage from "../images/Running.jpg";
import casualImage from "../images/casual.jpg";
import hikingImage from "../images/hikingShoes.jpg";
import webBanner from "../images/WebBannerPNG.png";
import hikingBackground from "../images/hikingBackground.jpg";
import { MostPopular } from "../components/MostPopular";
import { RecentProducts } from "../components/RecentProducts";
import { Link } from "react-router-dom";
import { FollowInstagram } from "../components/FollowInstagram";
//Home Page

//Featured Section/Banner section

// Top Products

// Instagram Section

// categories section

export const FrontPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <img
          src={hikingBackground}
          alt=""
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
      
      <div style={{ backgroundColor: "#fff", height: "800px", width: "100%" , paddingTop:'100px'}}>
        <h2>Categories</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              //  backgroundColor: "#ddd",
              height: "600px",
              width: "300px",
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=running`,
              }}
              style={{textDecoration: 'solid'}}
            >
            <img src={runningImage} alt="" width="100%" />
            <h4 style={{textDecoration:'none', color:'black'}}>Running</h4>  
            </Link>
            
          </div>
          <div
            style={{
              // backgroundColor: "#ddd",
              height: "600px",
              width: "300px",
              marginTop: "50px",
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=casual`,
              }}
              style={{textDecoration: 'solid'}}
            >
            <img src={casualImage} alt="" width="100%" />
            <h4 style={{textDecoration:'none', color:'black'}}>Casual</h4>  
            </Link>
            
            
          </div>
          <div
            style={{ height: "600px", width: "300px" }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=hiking`,
              }}
              style={{textDecoration: 'solid'}}
            >
            <img src={hikingImage} alt="" width="100%" />
            <h4 style={{textDecoration:'none', color:'black'}}>
             Hiking 
            </h4>  
            </Link>
            
            
          </div>
        </div>
      </div>
<div
        style={{
          backgroundColor: "#ddd",
          height: "300px",
          width: "100%",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>Next day delivery in the uk</div>
        <div>30 day return refund</div>
        <div>customer support</div>
      </div>
        

          <RecentProducts />
          <Link to="/store">Explore more</Link>
  
     <FollowInstagram/>
      
      <RecentlyViewed />
    </div>
  );
};
