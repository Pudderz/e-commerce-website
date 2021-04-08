import React from "react";
import { Categories } from "../components/FrontPage/Categories";
import { MostPopular } from "../components/FrontPage/MostPopular";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import casualBackground from "../images/casualBackground.jpg";
export const Men = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121", position:'relative' }}>
        <img src={casualBackground} alt="" style={{ maxWidth: "100vw", maxHeight:'700px', objectFit:'cover', width:'100%' }} />
      </div>

      <div>
        <MostPopular popularProducts={products} header={"Trending Men's Products"}/>
      </div>
      <div>
        <h3>Newest men's products</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Men discounts</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Men Categorys</h3>
        <hr />
        <Categories />
      </div>
    </div>
  );
};


export async function getStaticProps({ params }) {
  let data = [];

  try {
    await axios.get(`${process.env.BACKEND_SERVER}/trendingMale`).then((res) => {
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



export default Men;
