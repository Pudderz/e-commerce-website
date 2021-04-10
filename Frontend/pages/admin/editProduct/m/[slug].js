import React from "react";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { LOAD_PRODUCT_BY_SLUG } from "../../../../GraphQL/Queries";
import dynamic from 'next/dynamic';
import { initializeApollo } from "../../../../lib/apolloClient";
import AdminRoutes from "../../../../components/Authentication/AdminRoutes";

const EditProductPage = dynamic(() => import("../../../../pagesAuth/adminPages/EditProductPage"));


export const ProductPage = (props) => {
  const router = useRouter();

  // Fallback
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (props?.name === "" || typeof props?.name === "undefined") {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (

      <AdminRoutes>
        <EditProductPage {...props}/>
      </AdminRoutes>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  console.log(`params`);
  console.log(params);

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_PRODUCT_BY_SLUG,
    variables: { slug: `m/${encodeURIComponent(params.slug)}` },
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
      isDiscounted: result?.discounted || "",
      discountedFrom: result?.discountedFrom || result?.price || "",
    },
    // revalidate: 120,
  };
}

// Add static paths etc
export async function getStaticPaths() {
  let products = [];

  return {
    paths:
      products?.map(({ permalink }) => {
        console.log("slug - ", permalink);
        return `/editProduct/${permalink}`;
      }) ?? [],
    fallback: true,
  };
}
