import Image from "next/image";
import React from "react";
import { Categories } from "../components/FrontPage/Categories";
import { MostPopular } from "../components/FrontPage/MostPopular";
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import casualBackground from "../images/casualBackground.jpg";
import runningBackground from "../images/runningBackground.jpg"
const axios = require("axios").default;

export const Men = ({products}) => {
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
      


        <MostPopular popularProducts={products} header={"Trending Men's Products"}/>

        <RecentProducts header={"Newest men's products"} variables={{ male:true}}/>
  
        <RecentProducts header={"Men discounts"} variables={{discounted: true, male:true}}/>

      <hr/>
        <Categories header ={"Men Categories"} gender={"male"}/>
      
    </div>
  );
};


export async function getStaticProps({ params }) {
  let data = {products: []};
console.log('getting static props');
console.log(process.env.BACKEND_SERVER);
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
