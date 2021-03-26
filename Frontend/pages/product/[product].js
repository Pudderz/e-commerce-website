import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { ProductImages } from "../../components/ProductPages/ProductImages";
import { ProductTabs } from "../../components/ProductPages/ProductTabs";
import { RecentlyViewed } from "../../components/Common/RecentlyViewed";
import { commerce, fetchItem } from "../../lib/commerce";
import { addToHistory } from "../../lib/localStorage";
import { useSnackbar } from "notistack";
import { CartContext } from "../../context/CartContext";
import { SelectSize } from "../../components/ProductPages/SelectSize";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Image from "next/image";
import SelectSmallSize from "../../components/ProductPages/SelectSizeSmall";
import { initializeApollo } from "../../lib/apolloClient";
import { LOAD_ALL_PRODUCTS, LOAD_PRODUCT_BY_SLUG } from "../../GraphQL/Queries";
import { useLazyQuery } from "@apollo/client";

// const fetchMongoDBProduct = () =>{
  
// }


export const ProductPage = (props) => {
  console.log(props)


  const [fetchMongoDBProduct, {data}] = useLazyQuery(LOAD_PRODUCT_BY_SLUG)

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

  useEffect(() => {

    // try{
    //   fetchItem(props?.id, setProduct);
    // }catch(err){
    //   console.log(err);
    //   console.log("fetching off MongoDB");
    //   fetchMongoDBProduct({variables: {slug: props.slug}})
    // }
    
    setProduct(props);
  }, [props]);

  useEffect(() => {
    console.log(product);
    if (
      typeof product?.variants !== "undefined" &&
      product?.variants?.length !== 0
    ) {
      let sizeObject = {};
      product?.variants?.forEach((variant) => {
        if (variant.name === "size") {
          sizeId.current = variant.id;
          variant?.options?.forEach((sizes, index) => {
            sizeObject[sizes.name] = { id: sizes.id, quantity: sizes.quantity };
          });
          setSizeInfo(sizeObject);
        }
      });
    }
  }, [product]);

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
        <ProductImages images={props.assets || props.images} />

        <div className="itemDescription">
          <h1>{product.name}</h1>
          {/* +Review bar */}

          <h2>{props?.price?.formatted_with_symbol || `£${props?.price}.00`}</h2>
          <p style={{ color: "green" }}>
            In Stock{" "}
            {/* {size !== ""
              ? ` UK ${size} (${sizeInfo[size]?.quantity || 0} left)`
              : `(${product.quantity} left)`} */}
          </p>

          <label htmlFor="sizes" style={{ fontWeight: "bold" }}>
            Select size
          </label>
          <SelectSize
            availableSizes={sizeInfo}
            productVariants={product.variants}
            changeSize={changeSize}
            size={size}
          />
          {/* <a href="#!">Size Guide</a> */}
          <hr />
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Button
              onClick={() => handleAddToCart(product, 1)}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              style={{
                backgroundColor: "#bc2334",
                color: "white",
                width: "60%",
              }}
            >
              ADD TO BASKET
            </Button>
            {/* <Button variant="contained">BUY NOW</Button> */}
          </div>

          {/* tabbed sections with information  */}
        </div>
      </div>

      {/* sticky header for when top section is not in view (intersection observer)
       */}

      {/* <div className="itemNav">
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
          <Link href="/">Home</Link>
          <Link href="/">Store</Link>
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
          <SelectSmallSize
            availableSizes={sizeInfo}
            productVariants={product.variants}
            changeSize={changeSize}
            size={size}
          />
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "400px",
              maxWidth: "100%",
            }}
          >
            <Button
              onClick={() => handleAddToCart(product, 1)}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              style={{
                backgroundColor: "#bc2334",
                color: "white",
                width: "60%",
                height: "fit-content",
                margin: "1em 1em 0",
              }}
            >
              ADD TO BASKET
            </Button>
          </div>
        </div>
      </div>
      <hr /> */}
      <ProductTabs product={product} />
      <RecentlyViewed />
    </div>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  console.log(`params`);
  console.log(params)
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: LOAD_PRODUCT_BY_SLUG,
    variables: { slug: params.product },
  });

  if (!data.getProductBySlug) {
    let productData = {};
    await commerce.products
      .retrieve(params.product, { type: "permalink" })
      .then((product) => {
        console.log(product);
        productData = product;
      });
    return {
      props: {
        name: productData?.name || "",
        id: productData?.id || "",
        price: productData?.price?.formatted_with_symbol,
        description: productData?.description || "",
        variants: productData?.variants || [],
        assets: productData?.assets || [],
      },
      revalidate: 120,
    };
  }

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
  await commerce.products.list().then(({ data }) => {
    // if(data){
    //   // products = data;
    // }
    data?.forEach((product)=>{
      products.push({slug: product.permalink})
    })
    
  });
  const apolloClient = initializeApollo();


  const { data } = await apolloClient.query({
    query: LOAD_ALL_PRODUCTS});
    if(data?.getAllProducts){
      data?.getAllProducts?.forEach((product)=>{
        products.push({slug: product.slug})
      })
      // products = [...data.getAllProducts, ...products];
    }
  
  products = products.filter(product => product.slug !== null)
  console.log('[product] paths')
  console.log(products)
  return {
    paths:
      products?.map((product) => {
        
        if(product){
          console.log(product.slug, product.permalink)
          if(product.slug){
            console.log("slug - ", product.slug);
          return `/product/${product.slug}`;
        }
        if(product.permalink){
          console.log("slug - ", product.permalink);
        return `/product/${product.permalink}`;
        }
        }
        
      }) ?? [],
    fallback: true,
  };
}
