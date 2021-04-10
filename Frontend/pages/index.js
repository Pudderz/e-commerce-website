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
import Image from "next/image";

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
          maxHeight: "min(90vh, 750px)",
          width: "100%",
          backgroundColor: "#111111",
          position: "relative",
          paddingBottom:'min(56.25%, 750px)'
        }}
      >
        <div
          style={{
            position: "absolute",
            color: "white",
            top: "33%",
            left: "10%",
            fontSize:  "min(40px,4vw)",
            zIndex: "1",
            textAlign: "start",
          }}
        >
          <h3 style={{ margin: "0" }}>E-Commerce Site</h3>
          <p style={{ margin: "0 0 10px" }}>view our great deals</p>
          <Button className="buttonOutlined light" variant="outlined"
          style={{fontSize:  "min(20px,4vw)"}}
          >
            Save Now
          </Button>
        </div>
        <div
          style={{
            clipPath: "circle(50% at 70% 50%)",
            height: "100%",
            position:'absolute',
            width:'100%',
          }}
        >
          <Image 
          src={casualBackground}
          layout="fill"
          objectFit="cover"
          />
        </div>
      </div>
      <div
        style={{
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems:'center'
        }}
      >
        <IconButton style={{height:'fit-content'}}>
          <ArrowBackIosIcon />
        </IconButton>
        <p style={{ fontSize:  "min(20px,4vw)", margin: "0", alignSelf: "center" }}>
          30 Days return policy. Learn More
        </p>
        <IconButton style={{height:'fit-content'}}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      <div
      className="timeForUpgrade"
      >
        <div
          
      
        >
          <h2 style={{ margin: "0", fontSize:  "clamp(20px,6vw,40px )", }}>Time For An Upgrade</h2>
          <div
          className="timeForUpgradeButtons"
  
          >
            <Link href="/women">
              <Button className="buttonOutlined dark">Shop Women</Button>
            </Link>
            <Link href="/men">
              <Button className="buttonOutlined dark">Shop Men</Button>
            </Link>
            <Link href="/discounts">
              <Button className="buttonOutlined dark">Shop Sales</Button>
            </Link>
          </div>
        </div>
      </div>

      <MostPopular popularProducts={products} header={"Most Popular"} />

      <Categories />

      <RecentProducts />

      <Button className="buttonOutlined dark">
        <Link href="/store">View More...</Link>
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
    console.log(data);

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
