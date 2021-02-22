import Link from 'next/link';
import React, { useState } from "react";

export const ItemImage = ({ firstImage, secondImage, name, id, link }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
     
      href={`/product/${link}`}
      
    ><div 
     onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    style={{ position: "relative", cursor: "pointer", width:'fit-content', margin:'auto' }}>
      <img
        src={firstImage}
        alt={name}
        className="mainImage"
        style={{
          zIndex: hover ? "0" : "1",
        }}
      />
      <img
        src={secondImage}
        alt={name}
        className="secondaryImage"
        style={{
          zIndex: hover ? "1" : "0",
        }}
      />
    </div>
      
    </Link>
  );
};
