import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

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

export const ChangeStock = ({ changeStock,stockArray, size }) => {
  const [array, setArray]= useState([]);

  useEffect(() => {
    setArray(stockArray)

  }, [stockArray])

  const handleButtonChange = (e) => {
    changeSize(1 * e.target.textContent);
  };

  const handleStockChange =(index, value)=>{
      changeStock(index, value)
  }

  return (
    <div>
      <h4 style={{ textAlign: "start", margin: "0" }}>Stock (Total: {0})</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h4>Size</h4>
        <h4 style={{ width: "140px" }}>Quantity</h4>
      </div>
      <hr style={{margin:'0'}} />
      <div style={{ height: "400px", overflow: "auto" }}>
        <ul style={{listStyle:'none', padding:'0'}}>
           {ALL_SIZES.map((number, index) => (
            <li
            key={index}
              style={{
                border: "1px solid #ebedee",
                borderRadius: "0",
                borderLeft: "none",
                borderTop: "none",
                display: "flex",
                padding: "5px 20px",
                justifyContent: "space-between",
              }}
            >
              <p>UK {number}</p>

              <div style={{ display: "flex" }}>
                <Button  onClick={()=>handleStockChange(index, +1)}>
                  +
                </Button>
                <p>{stockArray?.[index]}</p>
                <Button  onClick={()=>handleStockChange(index, -1)}>
                  -
                </Button>
              </div>
            </li>
          ))}
        </ul>
       
      </div>
    </div>
  );
};

// Add proptype
