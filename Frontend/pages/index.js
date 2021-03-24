import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import hikingBackground from "../images/hikingBackground.jpg";
import { MostPopular } from "../components/FrontPage/MostPopular";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import { FollowInstagram } from "../components/FrontPage/FollowInstagram";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import { Categories } from "../components/FrontPage/Categories";
import { commerce } from "../lib/commerce";
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
            zIndex: "2",
            textAlign:'start'
          }}
        >
          <h3 style={{margin:'0'}}>E-Commerce Site</h3>
          <p style={{margin:'0'}}>view the great deals</p>
          <Button className="buttonOutlined light" variant="outlined">Shop Now</Button>
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
          // backgroundColor: "#efefef",
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

      <MostPopular popularProducts={products} />

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
  let popularProducts = [];
  const fetchProducts = async () => {
    await commerce.products
      .list({ limit: 4 })
      .then((item) => {
        popularProducts = item.data;
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  let data = [];

  try {
    await axios.get(`${process.env.BACKEND_SERVER}/trending`).then((res) => {
      data = res.data;
    });
  } catch (err) {
    console.log(err);
  } finally {
    let j = 0;

    if (data.length === 0 || typeof data === "undefined") {
      await fetchProducts();
    } else {
      for (let i = 0; j <= 4 && i < data.length; i++) {
        // Have to call them separately as the commerce library has no option to find a group of products.

        // In the Future I hope to have the commerce db in mongoDB allowing this process to effiecient

        await commerce.products
          .retrieve(data?.[i].slug, { type: "permalink" })
          .then((item) => {
            if (!!item) {
              popularProducts.push(item);
              j++;
            }
          })
          .catch((error) => {
            console.log("There was an error fetching the products", error);
            fetchProducts();
          });
      }
    }
    console.log("products");
    console.log(popularProducts);
    return {
      props: {
        products: popularProducts,
      },
      revalidate: 300,
    };
  }
}

export default FrontPage;
