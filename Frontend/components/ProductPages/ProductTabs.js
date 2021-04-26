import React, { useState, useEffect } from "react";
import { ReviewProduct } from "../Review/ReviewProduct";
import { SizeGuide } from "./SizeGuide";
import { DeliveryAndReturns } from "./DeliveryAndReturns";
import { Tab } from "./Tab";
import ReactMarkdown from "react-markdown";

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
      <Tab name={"Product Details"}>
        <div>
          <h2>{product?.name}</h2>
          <ReactMarkdown children={product?.description} />
        </div>
      </Tab>

      <Tab name={"Size Guide"}>
        <SizeGuide />
      </Tab>
      <Tab name={"Delivery & Returns"}>
        <DeliveryAndReturns />
      </Tab>
      <Tab name={"Reviews"}>
        <ReviewProduct
          product={product}
          productId={product?.id}
          productName={product?.name}
        />
      </Tab>
    </div>
  );
};
