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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import { GetReviews } from "../components/GraphQl/GetReviews";
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


{/* Category Selection */}
      <div style={{ backgroundColor: "#fff", height: "800px", width: "100%" , paddingTop:'100px'}}>
        <h2>Categories</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap:'30px',
            margin: "20px 0",
            padding:'40px',
            boxSizing:'border-box'
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
          
          height: "300px",
          width: "90%",
          margin: "20px auto 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{display:'grid', height:'fit-content', maxWidth:'300px'}}>
          <div><LocalShippingIcon style={{ fontSize: 70 }}/></div>
          <h3>Next day delivery in the uk</h3>
          <p>If you order before 3pm</p>
          
          </div>
        <div style={{display:'grid', height:'fit-content', maxWidth:'300px'}}>
          <div><PaymentIcon  style={{ fontSize: 70 }}/></div>
          <h3>30 day return refund</h3>
          <p>Did't not get the right size or colour. 30 days refund no questions asked.</p>

          </div>
        <div style={{display:'grid', height:'fit-content', maxWidth:'300px'}}>
          <div><PaymentIcon style={{ fontSize: 70 }} /></div>
          <h3>24/7 Customer Support</h3>
          <p></p>

          </div>
        
      </div>
        

          <RecentProducts />
          <Link to="/store">Explore more</Link>
  
     <FollowInstagram/>
      
      <RecentlyViewed />
    </div>
  );
};
