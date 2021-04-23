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
import { addCartItem, removeCartItem } from "../../Redux/actions/actions";
import { connect } from "react-redux";
import { AddToCart } from "lib/cart";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  width: fit-content;
  text-align: start;
  margin-top: 50px;
  flex-flow: wrap;
  max-width: 100%;
`;

const ItemHeaderInfo = styled.div`
  max-width: 80%;
  padding: 0 40px;
  @media (max-width: 1200px) {
    .selectSize {
      width: 100%;
    }
    margin: auto;
    max-width: 100%;
    padding: 0;
    width: 90%;
    button {
      width: 50%;
    }
  }
`;

export const ProductPageContent = (props) => {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  // Fallback
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (props?.name === "" || typeof props?.name === "undefined") {
    return <DefaultErrorPage statusCode={404} />;
  }

  const addedToHistoryRef = useRef(false);
  useEffect(() => {
    setProduct(props.props);
  }, [props.props]);

  useEffect(() => {
    if (props.props && !addedToHistoryRef.current) {
      addToHistory(props.props);
      addedToHistoryRef.current = true;
    }
  }, [props.props]);

  const handleAddToCart = (item, quantity = 1) => {
    try {
      AddToCart(item, size, quantity, props.addCartItem);
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }
  };

  const changeSize = (size) => {
    setSize(size);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <Wrapper>
        <ProductImages images={props.assets || props.images} />

        <ItemHeaderInfo >
          <h1>{product?.name}</h1>
          <h2>£{(props?.price / 100).toFixed(2)}</h2>
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
        </ItemHeaderInfo >
      </Wrapper>

      {/* <div className="itemNav">
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
      <hr /> */}
      <ProductTabs product={product} />
      <RecentlyViewed />
    </div>
  );
};

//Redux code
const mapStateToProps = (state, ownProps) => ({
  state: { ...state },
  props: { ...ownProps },
});

const mapDispatchToProps = {
  addCartItem,
  removeCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContent);
