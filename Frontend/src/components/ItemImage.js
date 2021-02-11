import { Link } from "react-router-dom";
import React, { useState } from "react";

export const ItemImage = ({ firstImage, secondImage, name, id }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      to={{
        pathname: "./product",
        search: `?id=${id}`,
      }}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <img
        src={firstImage}
        alt={name}
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          zIndex: hover ? "0" : "1",
          position: "relative",
        }}
      />
      <img
        src={secondImage}
        alt={name}
        style={{ maxWidth: "100%", maxHeight: "300px" }}
        style={{
          position: "absolute",
          maxWidth: "100%",
          left: "0",
          zIndex: hover ? "1" : "0",
        }}
      />
    </Link>
  );
};
