import Link from "next/link";
import React, { useEffect } from "react";
import { RecentlyViewed } from "components/Common/RecentlyViewed";
import { MostPopular } from "components/FrontPage/MostPopular";
import { GetProducts } from "components/FrontPage/GetProducts";
import { Categories } from "components/FrontPage/Categories";
import { Button } from "@material-ui/core";
import casualBackground from "images/casualBackground2.jpg";
import TextSlider from "components/FrontPage/TextSlider";
import Banner from "components/FrontPage/Banner";
import TimeForUpgrade from "components/FrontPage/TimeForUpgrade";

const axios = require("axios").default;

export const FrontPage = ({ products }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner image={casualBackground}>
        <h3 style={{ margin: "0" }}>E-Commerce Site</h3>
        <p style={{ margin: "0 0 10px" }}>view our great deals</p>
        <Button
          className="buttonOutlined light"
          variant="outlined"
          style={{ fontSize: "min(20px,4vw)" }}
        >
          <Link href="/store">Save Now</Link>
        </Button>
      </Banner>

      <TextSlider />

      <TimeForUpgrade />

      <MostPopular popularProducts={products} header={"Most Popular"} />

      <Categories />

      <GetProducts />

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
