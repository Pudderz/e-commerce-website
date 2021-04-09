import Link from "next/link";
import React, { useEffect } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import { MostPopular } from "../components/FrontPage/MostPopular";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import { Categories } from "../components/FrontPage/Categories";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import casualBackground from "../images/casualBackground2.jpg";

const axios = require("axios").default;

export const FrontPage = ({ products }) => {

  console.log(products);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "min(90vh, 750px)",
          width: "100%",
          backgroundColor: "#111111",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            color: "white",
            top: "33%",
            left: "10%",
            fontSize: "40px",
            zIndex: "1",
            textAlign:'start'
          }}
        >
          <h3 style={{margin:'0'}}>E-Commerce Site</h3>
          <p style={{margin:'0'}}>view our great deals</p>
          <Button className="buttonOutlined light" variant="outlined">Save Now</Button>
        </div>
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <div
          style={{
            clipPath: "circle(50% at 70% 50%)",
            height: "100%",
          }}
        >
          <img
            src={casualBackground}
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
        </div>
      </div>
      <div
        style={{
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <p style={{ fontSize: "20px", margin: "0", alignSelf: "center" }}>
          30 Days return policy. Learn More
        </p>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      <div
        style={{
          backgroundColor: "#f5f8f8",
          padding: "75px 0",
          display: "flex",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            width: "100%",
            display: "flex",
            flexFlow: "column",
            gap: "50px",
          }}
        >
          <h2 style={{ margin: "0", fontSize: "40px" }}>Time For An Upgrade</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "1300px",
              margin: "auto",
              width: "100%",
            }}
          >
            <Button className="buttonOutlined dark">Shop Women</Button>
            <Button className="buttonOutlined dark">Shop Men</Button>
            <Button className="buttonOutlined dark">Shop Sales</Button>
          </div>
        </div>
      </div>

      <MostPopular popularProducts={products} header={"Most Popular"}/>

      <Categories />

      <RecentProducts />

       <Button
       className="buttonOutlined dark"
       >
         <Link href="/store" >View More...</Link>
         </Button>     
      

      <RecentlyViewed />
    </div>
  );
};
export async function getStaticProps({ params }) {
  let data = [];

  try {
    await axios.get(`${process.env.BACKEND_SERVER}/trending`).then((res) => {
      data = res.data;
    });
  } catch (err) {
    console.log(err);
  } finally {

    console.log(data)

    console.log("products");
    return {
      props: {
        products: data.products,
      },
      revalidate: 300,
    };
  }
}

export default FrontPage;
