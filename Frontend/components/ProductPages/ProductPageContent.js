import { Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { ProductImages } from "./ProductImages";
import { ProductTabs } from "./ProductTabs";
import { RecentlyViewed } from "../../components/Common/RecentlyViewed";
import { addToHistory } from "../../lib/localStorage";
import { useSnackbar } from "notistack";
import { SelectSize } from "../../components/ProductPages/SelectSize";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { addCartItem, removeCartItem } from "../../Redux/actions/actions";
import { connect } from "react-redux";
import { AddToCart } from "lib/cart";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

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
  padding: 40px 40px;
  @media (max-width: 1200px) {
    /* .selectSize {
      width: 100%;
    } */
    margin: auto;
    max-width: 100%;
    padding: 0;
    width: 90%;
    /* button {
      width: 50%;
    } */
  }
`;

export const ProductPageContent = (props) => {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const addedToHistoryRef = useRef(false);
  const router = useRouter();

  // Fallback
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (props?.name === "" || typeof props?.name === "undefined") {
    return <DefaultErrorPage statusCode={404} />;
  }

  useEffect(() => {
    if (props.props && !addedToHistoryRef.current) {
      addToHistory(props.props);
      addedToHistoryRef.current = true;
    }
    setProduct(props.props);
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

  const changeSize = (size) => setSize(size);

  return (
    <div style={{ padding: "0 5px" }}>
      <Wrapper>
        <ProductImages images={props.assets || props.images} />

        <ItemHeaderInfo>
          <h1>{product?.name}</h1>
          <Rating
            precision={0.1}
            defaultValue={4}
            readOnly
            style={{ color: "#111" }}
          />
          <h2 style={{ margin: "20px 0", fontSize: "25px" }}>
            £{(props?.price / 100).toFixed(2)}
          </h2>

          <p style={{ color: "green", margin: "0 0 20px" }}>In Stock</p>
          <label htmlFor="sizes" style={{ color: "#888", fontSize: "14px" }}>
            Select size . Size Guide
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
              // startIcon={<ShoppingCartIcon />}
              style={{
                // backgroundColor: "#bc2334",
                backgroundColor: "#111",
                textTransform: "none",
                fontSize: "15px",
                color: "white",
                width: "100%",
              }}
            >
              Add to Basket
            </Button>
          </div>
          <div style={{ display: "grid", padding: "20px 0", gap: "5px" }}>
            <a href="#details">Product Details</a>
            <a href="#returns">Delivery & Return</a>
            <a href="#reviews">Reviews</a>
          </div>
        </ItemHeaderInfo>
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
