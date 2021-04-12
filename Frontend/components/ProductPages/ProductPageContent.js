import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ProductImages } from "./ProductImages";
import { ProductTabs } from "./ProductTabs";
import { RecentlyViewed } from "../../components/Common/RecentlyViewed";
import { addToHistory } from "../../lib/localStorage";
import { useSnackbar } from "notistack";
import { SelectSize } from "../../components/ProductPages/SelectSize";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import SelectSmallSize from "../../components/ProductPages/SelectSizeSmall";
import { initializeApollo } from "../../lib/apolloClient";
import {
    LOAD_ALL_PRODUCTS,
    LOAD_PRODUCT_BY_SLUG,
  } from "../../GraphQL/Queries";
  import { addCartItem, removeCartItem } from "../../Redux/actions/actions";
import { connect } from "react-redux";

export const ProductPageContent = (props) => {
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
  const { enqueueSnackbar } = useSnackbar();
  const sizeId = useRef();

  const addedToHistoryRef = useRef(false)
  useEffect(() => {
    setProduct(props.props);
  }, [props.props]);

  useEffect(() => {
    if(props.props && !addedToHistoryRef.current){
      addToHistory(props.props);
      addedToHistoryRef.current = true;
    }

  }, [props.props]);

  const handleAddToCart = (item, quantity = 1) => {
    console.log(item);
    console.log(sizeId.current, size);
    if (size !== "") {
      //Work out maxStock
      let minSize = 3.5;
      let maxStock = 1;
      maxStock = (size - minSize) * 2;
      console.log(item.stock[maxStock]);
      console.log(item.price);
      //dispatch
      props.addCartItem({
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        quantity: 1,
        images: item.images,
        size: size,
        maxStock: item.stock[maxStock],
      });
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
        <ProductImages images={props.assets || props.images} />

        <div className="itemDescription">
          <h1>{product?.name}</h1>

          <h2>£{(props?.price/100).toFixed(2)}</h2>
          <p style={{ color: "green" }}>In Stock</p>

          <label htmlFor="sizes" style={{ fontWeight: "bold" }}>
            Select size
          </label>
          <SelectSize
            availableSizes={props?.stock}
            changeSize={changeSize}
            size={size}
          />
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
          </div>
        </div>
      </div>

      {/* sticky header for when top section is not in view (intersection observer)
       */}

      <div className="itemNav">
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
          <Link href="/">Home</Link>
          <Link href="/">Store</Link>
          <Typography>{product?.name}</Typography>
        </Breadcrumbs>

        <div style={{ display: "flex" }}>
          <img src={props.assets?.[0].url} height="60px" alt={product?.name} />
          <h4 style={{ margin: "1em" }}>{product?.name}</h4>
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
            availableSizes={props?.stock}
            productVariants={product?.variants}
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
      <hr />
      <ProductTabs product={product} />
      <RecentlyViewed />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
    // ... computed data from state and optionally ownProps
    state: { ...state },
    props: { ...ownProps },
  });
  
  const mapDispatchToProps = {
    addCartItem,
    removeCartItem,
    // ... normally is an object full of action creators
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContent);
  // export default Basket;
  