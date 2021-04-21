import React from "react";
import { MostPopular } from "components/FrontPage/MostPopular";
import webBanner from "images/WebBannerPNG.png";
import { Categories } from "components/FrontPage/Categories";
import { RecentProducts } from "components/FrontPage/RecentProducts";
import runningBackground from "images/runningBackground.jpg"
import Image from "next/image";
const axios = require("axios").default;

export const Women = ({ products }) => {
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
        <div style={{ 
          clipPath: "circle(65% at 70% 50%)",
          height: "100%",
          position:'absolute',
          width:'80%',
          right:'0'
         }}>
        <Image src={runningBackground} 
        layout="fill"
        objectFit="cover"
        />
        {/* <img src={casualBackground} alt="" style={{ maxWidth: "100vw", maxHeight:'700px', objectFit:'cover', width:'100%' }} /> */}
      </div>
      </div>

      <MostPopular
        popularProducts={products}
        header={"Trending Women's Products"}
      />

      <RecentProducts
        header={"Newest Women Products"}
        variables={{ female: true }}
      />

      <RecentProducts
        header={"Women discounts"}
        variables={{ discounted: true, female: true }}
      />

        <Categories header={"Women Categories"} gender={"female"} />

    </div>
  );
};

export async function getStaticProps({ params }) {
  let data = { products: [] };

  try {
    await axios
      .get(`${process.env.BACKEND_SERVER}/trendingFemale`)
      .then((res) => {
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

export default Women;
