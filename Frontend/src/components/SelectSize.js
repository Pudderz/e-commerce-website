import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const ALL_SIZES = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];



export const SelectSize = ({ availableSizes, changeSize,size }) => {
  
  const [selectedSize, setSelectedSize] = useState(null)

  useEffect(() => {
    setSelectedSize(size);
  }, [size])

  const handleButtonChange = (e)=>{
    changeSize(e.target.textContent);
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "wrap",
        width: "400px",
        borderLeft: "1px solid #ebedee",
        borderTop: "1px solid #ebedee",
        margin: "10px 0 20px",
        fontSize:'18px'
      }}
    >
      {ALL_SIZES.map((number, index) => {
        // Tests if that size is in the availableSizes object
        // If not an avaliable size disable button

          return (
            <Button
              key={index}
              disabled={!(number in availableSizes)}
              className={`availableSize ${(number==selectedSize) && 'selected'}`}
              onClick={handleButtonChange}
              style={{
                border: "1px solid #ebedee",
                borderRadius: "0",
                width: "20%",
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
