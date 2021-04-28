import React from "react";
import { initializeApollo } from "../../../lib/apolloClient";
import {
  LOAD_ALL_PRODUCTS,
  LOAD_PRODUCT_BY_SLUG,
} from "../../../GraphQL/Queries";
import ProductPageContent from "../../../components/ProductPages/ProductPageContent";

export const UnisexProductPage = (props) => <ProductPageContent {...props} />;

export default UnisexProductPage;



export async function getStaticProps({ params }) {
  console.log(`params`, params);

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_PRODUCT_BY_SLUG,
    variables: {
      slug: `u/${encodeURIComponent(params.product)}`,
      gender: "unisex",
    },
  });

  const result = data?.getProductBySlug;

  return {
    props: {
      name: result?.productName || "",
      id: result?._id || "",
      images: result?.images,
      price: result?.price,
      stock: result?.stock,
      description: result?.description || "",
      variants: result?.stock || [],
      slug: `u/${encodeURIComponent(params.product)}`,
    },
    // revalidate: 120,
  };
}

export async function getStaticPaths() {
  let products = [];

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_ALL_PRODUCTS,
    variables: { unisex: true },
  });

  if (data?.getAllProducts) {
    data?.getAllProducts?.forEach((product) => {
      products.push({ slug: product.slug, gender: product.gender });
    });
  }

  products = products.filter((product) => product.slug !== null);
  
  return {
    paths:
      products?.map((product) => {
        if (product && product?.slug && product?.gender === "unisex") {
          const slug = product.slug.replace("u/", "");
          console.log("unisex slug - ", product.slug);
          return `/product/u/${slug}`;
        }
      }) ?? [],
    fallback: true,
  };
}
