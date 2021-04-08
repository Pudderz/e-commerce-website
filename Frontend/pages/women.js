import React from "react";
import { MostPopular } from "../components/FrontPage/MostPopular";
import webBanner from "../images/WebBannerPNG.png";

const axios = require("axios").default;

export const Women = ({products}) => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
        <img src={webBanner} alt="" />
      </div>

      <div>
        <h3>Best Sellers Womens products</h3>
        <hr />
        <MostPopular popularProducts={products} header={"Trending Women's Products"}/>
      </div>
      <div>
        <h3>Newest Women Products</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Women discounts</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Women Categorys</h3>
        <hr />
        <Categories />
      </div>
    </div>
  );
};



export async function getStaticProps({ params }) {
  let data = [];

  try {
    await axios.get(`${process.env.BACKEND_SERVER}/trendingFemale`).then((res) => {
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


export default Women;