import React from "react";
import { MostPopular } from "../components/FrontPage/MostPopular";
import webBanner from "../images/WebBannerPNG.png";
import { Categories } from "../components/FrontPage/Categories";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
const axios = require("axios").default;

export const Women = ({ products }) => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
        <img src={webBanner} alt="" />
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

        <Categories header={"Women Categories"} />

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
