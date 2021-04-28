import React from "react";
import { initializeApollo } from "../../../lib/apolloClient";
import { LOAD_ALL_PRODUCTS, LOAD_PRODUCT_BY_SLUG } from "../../../GraphQL/Queries";
import  ProductPageContent  from "../../../components/ProductPages/ProductPageContent";


export const MaleProductPage = (props) => {
  console.log(props)
  return (
    <ProductPageContent {...props}/>
  );
};

export default MaleProductPage;


export async function getStaticProps({ params }) {
  console.log(`params`);
  console.log(params)
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_PRODUCT_BY_SLUG,
    variables: { slug: `m/${encodeURIComponent(params.product)}`, gender: "male" },
  });

  const result = data?.getProductBySlug;

  return {
    props: {
      name: result?.productName || "",
      id: result?._id || "",
      images: result?.images || [],
      price: result?.price || "",
      averageRating: result?.averageRating || 0,
      stock: result?.stock ,
      description: result?.description || "",
      variants: result?.stock || [],
      slug:  `m/${encodeURIComponent(params.product)}`,
    },
    // revalidate: 120,
  };
}

export async function getStaticPaths() {
  let products = [];

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_ALL_PRODUCTS,
    variables: {male:true}
  });
    if(data?.getAllProducts){
      data?.getAllProducts?.forEach((product)=>{
        products.push({slug: product.slug, gender: product.gender})
      })
    }
  
  products = products.filter(product => product.slug !== null)
 
  return {
    paths:
      products?.map((product) => {
        
        if(product && product?.slug){
          let slug = product.slug.replace('m/','');
          console.log("male slug - ", product.slug);
          return `/product/m/${slug}`;

        }
        
      }) ?? [],
    fallback: true,
  };
}
