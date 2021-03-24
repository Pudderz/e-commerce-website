import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { ProductImages } from "../../../components/Admin/ProductImages";
import { ProductTabs } from "../../../components/Admin/ProductTabs";
import { RecentlyViewed } from "../../../components/Common/RecentlyViewed";
import { commerce, fetchItem } from "../../../lib/commerce";
import { addToHistory } from "../../../lib/localStorage";
import { useSnackbar } from "notistack";
import { CartContext } from "../../../context/CartContext";
import { SelectSize } from "../../../components/ProductPages/SelectSize";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Image from "next/image";
import SelectSmallSize from "../../../components/ProductPages/SelectSizeSmall";
import { useLazyQuery } from "@apollo/client";
import { LOAD_PRODUCT_BY_SLUG } from "../../../GraphQL/Queries";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { abortableFetch } from "abortcontroller-polyfill/dist/cjs-ponyfill";
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { concatPagination } from '@apollo/client/utilities'
import { ChangeStock } from "../../../components/Admin/ChangeStock";

const ALL_SIZES = [
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
];



global.fetch = abortableFetch(fetch).fetch;
let apolloClient;


export const ProductPage = (props) => {
  console.log(props);
  const router = useRouter();

  // Fallback
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (props?.name === "" || typeof props?.name === "undefined") {
    return <DefaultErrorPage statusCode={404} />;
  }

  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const { changeCart, addVariantItemToCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();
  const sizeId = useRef();
  const [sizeInfo, setSizeInfo] = useState({});


  const [stockArray, setStockArray] = useState(Array.from({length: ALL_SIZES.length}, ()=> 0))





  // useEffect(() => {
  //   fetchItem(props?.id, setProduct);
  // }, [props]);

  const handleStockChange = (index, value)=>{
    let newValue = stockArray[index] + value
    stockArray[index] = newValue>=0? newValue: 0;
    setStockArray([...stockArray]);
  }



  useEffect(() => {
    setStockArray(props.stock)
  }, []);

  useEffect(() => {
    return () => {
      addToHistory(product);
    };
  }, []);

  const handleAddToCart = (item, quantity = 1) => {
    if (size !== "") {
      addVariantItemToCart(
        item,
        quantity,
        sizeId.current,
        sizeInfo[`${size}`].id,
        enqueueSnackbar
      );
    } else {
      enqueueSnackbar("Please Select a size", {
        variant: "error",
      });
    }
  };

  const changeSize = (size) => {
    setSize(size);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "fit-content",
          textAlign: "start",
          marginTop: "50px",
          flexFlow: "wrap",
          maxWidth: "100%",
        }}
      >
        {/* Product Images */}
        <ProductImages images={props.images} />

        <div className="itemDescription">
          <h1>{props.name}</h1>
          {/* +Review bar */}

          <h2>£{props?.price}</h2>
          <p style={{ color: "green" }}>
            In Stock{" "}
            {size !== ""
              ? ` UK ${size} (${sizeInfo[size]?.quantity || 0} left)`
              : `(${product.quantity} left)`}
          </p>

          {/* <label htmlFor="sizes" style={{ fontWeight: "bold" }}>
            Select size
          </label> */}
          <SelectSize
            availableSizes={props.stock}
            productVariants={product.variants}
            changeSize={changeSize}
            size={size}
          />
          {/* <a href="#!">Size Guide</a> */}
          <hr />
          <div style={{ justifyContent: "space-between", display: "flex" }}>
          </div>

        </div>
      </div>

      {/* sticky header for when top section is not in view (intersection observer)
       */}

      <div className="itemNav">
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
          <Link href="/">Home</Link>
          <Link href="/admin/allProducts">all products</Link>
          <Typography>{product?.name}</Typography>
        </Breadcrumbs>

        <div style={{ display: "flex" }}>
          <img src={props.assets?.[0].url} height="60px" alt={product?.name} />
          <h4 style={{ margin: "1em" }}>{product.name}</h4>
          <p>{product?.price?.formatted_with_symbol}</p>
        </div>

        <div
          style={{
            display: "flex",
            minWidth: "30%",
            width: "fit-content",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "400px",
              maxWidth: "100%",
            }}
          >

          </div>
        </div>
      </div>
      <hr />

{/* <form>
    <ChangeStock availableSizes={[4]} stockArray={stockArray} changeStock={handleStockChange}/>
    <Button variant="contained" color="primary">Save Stock</Button>
</form>
     */}



      <ProductTabs product={props} />
      <RecentlyViewed />
    </div>
  );
};

export default ProductPage;



function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.BACKEND_SERVER}/graphql`, // Server URL (must be absolute)
    }),
    cache: new InMemoryCache(),
  })
}

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'


export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}


export async function getStaticProps({ params }) {
  console.log(`params`);
  console.log(params);

  const apolloClient = initializeApollo()

  const {data} = await apolloClient.query({
    query: LOAD_PRODUCT_BY_SLUG,
    variables: {slug: params.slug},
  })

  console.log('data')
  console.log(data);

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
    },
    // revalidate: 120,
  };
}

export async function getStaticPaths() {
  let products = [];
  // await commerce.products.list().then(({ data }) => {
  //   products = data;
  // });
  return {
    paths:
      products?.map(({ permalink }) => {
        console.log("slug - ", permalink);
        return `/editProduct/${permalink}`;
      }) ?? [],
    fallback: true,
  };
}
