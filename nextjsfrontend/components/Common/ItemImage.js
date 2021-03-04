import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
export const ItemImage = ({ firstImage, secondImage, name, id, link }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={`/product/${link}`}>
      <div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        style={{
          position: "relative",
          cursor: "pointer",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <img
          src={firstImage}
          alt={name}
          className="mainImage"
          style={{
            zIndex: hover ? "0" : "1",
          }}
        />
        <Image
          src={secondImage}
          alt={name}
          className="secondaryImage"
          layout="fill"
          style={{
            zIndex: hover ? "1" : "0",
          }}
        />
      </div>
    </Link>
  );
};
