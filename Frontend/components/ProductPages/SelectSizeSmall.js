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

export const SelectSmallSize = ({ availableSizes, changeSize, size }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    setSelectedSize(size);
  }, [size]);

  const handleSelectChange = (e) => {
    changeSize(1 * e.target.value);
  };

  return (
    <select
      name="sizes"
      id="sizes"
      style={{ margin: "1em", height: "30px" }}
      value={size}
      onChange={handleSelectChange}
    >
      <option value="" disabled>
        Select a size
      </option>
      {ALL_SIZES.map((number, index) => {
        // Tests if that size is in the availableSizes object
        // If not sets avaliable size button to disabled
        if (number in availableSizes) {
          return (
            <option
              key={index}
              value={number}
              style={{
                border: "1px solid #ebedee",
                borderRadius: "0",
                width: "20%",
                borderLeft: "none",
                borderTop: "none",
              }}
            >
              UK {number}
            </option>
          );
        }
      })}
    </select>
  );
};

// Add proptype


export default SelectSmallSize;