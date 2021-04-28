import React from "react";
import { MostPopular } from "components/FrontPage/MostPopular";
import { Categories } from "components/FrontPage/Categories";
import { GetProducts } from "components/FrontPage/GetProducts";
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
      </div>
      </div>

      <MostPopular
        popularProducts={products}
        header={"Trending Women's Products"}
      />

      <GetProducts
        header={"Newest Women Products"}
        variables={{ female: true }}
      />

      <GetProducts
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
