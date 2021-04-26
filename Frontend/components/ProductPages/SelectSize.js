import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const SelectSizeWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 400px;
  margin: 10px 0 20px;
  font-size: 18px;
  gap: 5px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const SizeButton = styled(Button)`
  border: 1px solid #ebedee !important;
  border-radius: 5px;
  width: 20%;
  &:hover {
    background-color: #828488 !important;
    color: #fff;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -ms-transition: 0.5s all;
    -o-transition: 0.5s all;
  }
  &.selected {
    background-color: #4d5461 !important;
    color: white;
  }
  @media (max-width: 1200px) {
    width: 49%;
    &.disabled {
    display:none;
  }
  }
`;

export const SelectSize = ({ availableSizes, changeSize, size }) => {
  console.log(availableSizes);
  const [selectedSize, setSelectedSize] = useState(null);

  const [shoeSizes, setShoeSizes] = useState([]);
  useEffect(() => {
    console.log(size);
    setSelectedSize(size);
  }, [size]);

  useEffect(() => {
    const stock = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    availableSizes.forEach((sizeObject) => {
      let shoeIndex = (sizeObject.shoeSize / 10 - 3.5) / 0.5;
      stock[shoeIndex] = sizeObject.stock;
    });
    setShoeSizes(stock);
  }, [availableSizes]);

  const handleButtonChange = (e) => {
    changeSize(1 * e.target.textContent);
  };

  return (
    <SelectSizeWrapper>
      {shoeSizes?.map((number, index) => {
        // Tests if that size is in the availableSizes object
        // If not sets avaliable size button to disabled

        return (
          <SizeButton
            key={index}
            disabled={!(1 * shoeSizes[index])}
            className={`availableSize ${
              1 * ALL_SIZES[index] === selectedSize && "selected"
            } ${!(1 * shoeSizes[index]) && "disabled"}`}
            onClick={handleButtonChange}
          >
            {ALL_SIZES[index]}
          </SizeButton>
        );
      })}
    </SelectSizeWrapper>
  );
};

// Add proptype
