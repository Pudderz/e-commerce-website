import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ALL_SHOE_SIZES } from "../../globals/globals";




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
            <Button
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
            </Button>
          );
        
      })}
    </div>
  );
};

// Add proptype
