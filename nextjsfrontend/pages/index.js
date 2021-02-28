import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
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
const axios = require("axios").default;

export const FrontPage = ({products}) => {
  console.log(products);
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
      <MostPopular popularProducts={products} />

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

      <Link href="/store">Explore more</Link>

      <FollowInstagram />

      <RecentlyViewed />
    </div>
  );
};
export async function getStaticProps({ params }) {



let  popularProducts = [];
    const fetchProducts = () => {
      commerce.products
        .list({limit: 4})
        .then((item) => {
          popularProducts = item.data;
        })
        .catch((error) => {
          console.log("There was an error fetching the products", error);
        });
    };

      let data = [];
    
      await axios.get(`${process.env.BACKEND_SERVER}/trending`).then((res) => {
        data = res.data;
      });
    
      let j = 0;
    
      if (data.length === 0) {
        fetchProducts();
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

  return {
    props: {
      products: popularProducts,
    },
    revalidate: 300
  };
}





export default FrontPage;