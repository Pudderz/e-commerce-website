import { Button } from "@material-ui/core";
import React from "react";

const ALL_SIZES = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
export const SelectSize = ({ availableSizes }) => {
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
        if (availableSizes.includes(number)) {
          return (
            <Button
              key={index}
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
        } else {
          return (
            <Button
              key={index}
              disabled
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
        }
      })}
    </div>
  );
};

// Add proptype
