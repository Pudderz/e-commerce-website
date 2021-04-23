import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "components/Common/Item";

const ProductList = styled.ul`
  display: flex;
  overflow-x: auto;
  list-style: none;
  gap: 20px;
  margin: 0 20px;
  padding: 0;
  justify-content: start;

`;


export const MostPopular = ({ popularProducts, header }) => {
  const [products, setProducts] = useState(Array.from({ length: 4 }, () => 0));


  useEffect(() => {
    setProducts(popularProducts);
  }, [popularProducts]);


  return (
    <div style={{textAlign:"start"}}>
      <h3 style={{ marginLeft: "20px" }}>{header}</h3>
    
      <hr />
        <ProductList>
          {products.map((item, index) => (
              <Item item={item} key ={index} />        
          ))}
        </ProductList>
        <hr />
    </div>
  );
};
