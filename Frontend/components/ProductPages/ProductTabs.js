import React, { useState, useEffect } from "react";
import { ReviewProduct } from "../Review/ReviewProduct";
import { SizeGuide } from "./SizeGuide";
import { DeliveryAndReturns } from "./DeliveryAndReturns";
import { Tab } from "./Tab";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
const TabHeader = styled.a`
  width: 100%;
  justify-content: space-between !important;
  text-align: center;
  height: fit-content;
  font-size: min(15px, 1rem);
  @media (max-width: 800px) {
    padding: 5px;
    height: 100%;
  }
`;

// display: "flex", position:"sticky", top:'52px', zIndex:"1"
const TabHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  z-index: 1;
  position: sticky;
  top: 52px;
  background-color: #fff !important;
  box-shadow: 0px 3px 3px rgb(0, 0, 0, 0.15);
  margin: 0 -5px;
`;

export const ProductTabs = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.product);
  }, [props]);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "initial",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <TabHeaderWrapper>
        <TabHeader href="#details">Product Details</TabHeader>
        <TabHeader href="#size">Size Guide</TabHeader>
        <TabHeader href="#returns">Delivery & Returns</TabHeader>
        <TabHeader href="#reviews">Reviews</TabHeader>
      </TabHeaderWrapper>
      <Tab name={"Product Details"} id={"details"}>
        <div>
          <h2>{product?.name}</h2>
          <ReactMarkdown children={product?.description} />
        </div>
      </Tab>

      <Tab name={"Size Guide"} id={"size"}>
        <SizeGuide />
      </Tab>
      <Tab name={"Delivery & Returns"} id="returns">
        <DeliveryAndReturns />
      </Tab>
      <Tab name={"Reviews"} id="reviews">
        <ReviewProduct
          product={product}
          productId={product?.id}
          productName={product?.name}
        />
      </Tab>
    </div>
  );
};
