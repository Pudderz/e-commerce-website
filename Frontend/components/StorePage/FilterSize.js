import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ALL_SHOE_SIZES } from "../../globals/globals";
import styled from "styled-components";

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



export const FilterSize = ({ changeSize, sizes: selectedSizes }) => {

  const handleButtonChange = (e)=>{
    changeSize(1*e.target.textContent);
  }

  return (
    <div className="selectSize"
    style={{width:'auto'}}
    >
      {ALL_SHOE_SIZES?.map((number, index) => {
        // Tests if that size is in the availableSizes object
        // If not sets avaliable size button to disabled
        let doesInclude = selectedSizes.includes(number*10);
          return (
            <SizeButton
              key={index}
              className={`availableSize ${(doesInclude) && 'selected'}`}
              onClick={handleButtonChange}
              style={{
                border: "1px solid #ebedee",
                borderRadius: "0",
                width: "33.33%",
                borderLeft: "none",
                borderTop: "none",
              }}
            >
              {number}
            </SizeButton>
          );
        
      })}
    </div>
  );
};

// Add proptype
