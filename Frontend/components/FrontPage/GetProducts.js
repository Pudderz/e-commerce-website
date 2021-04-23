import React, { useState, useEffect, useRef } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button } from "@material-ui/core";
import { ItemImage } from "../Common/ItemImage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../../GraphQL/Queries";
import styled from "styled-components";
import Item from "components/Common/Item";

const ProductList = styled.ul`
  display: flex;
  flex-flow: wrap;
  list-style: none;
  gap: 20px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
`;

export const GetProducts = ({ variables, header }) => {
  const [products, setProducts] = useState(Array.from({ length: 8 }, () => 0));
  const [fetchProducts, { loading, error, data }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );
  const container = useRef();
  const isMin = useRef(false);

  useEffect(() => {
    fetchProducts({ variables: { limit: 8, ...variables } });
  }, []);

  useEffect(() => {
    if (typeof data !== "undefined") {
      setProducts(data.getAllProducts);
    }
  }, [data]);

  const handleMinimize = () => {
    container.current.style.height = isMin.current ? "fit-content" : "0px";
    isMin.current = !isMin.current;
  };

  if (products.length === 0 && !loading && data) {
    return <div></div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>
          {header || "Newest"}
        </h3>
        <Button onClick={handleMinimize}>
          <ExpandMoreIcon />
          <ExpandLessIcon />
        </Button>
      </div>

      <hr />
      <div
        ref={container}
        style={{ overflow: "hidden", height: "fit-content" }}
      >
        <ProductList>
          {products.map((item, index) => (
            
            <Item item={item} key={index}/>
           
          ))}
        </ProductList>
      </div>
    </div>
  );
};

export default GetProducts;
