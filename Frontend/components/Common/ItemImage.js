import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
export const ItemImage = ({ firstImage, secondImage, name, id, link }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={`/product/${link}`}>
      <div
      className={"itemImageContainer"}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        style={{
          position: "relative",
          cursor: "pointer",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <Image
          src={firstImage}
          alt={name}
          className={`mainImage ${hover? "active": ""}`}
          height={200}
          width={200}
         
        />
        <Image
          src={secondImage}
          alt={name}
          className={`secondaryImage ${hover? "active": ""}`}
          height={200}
          width={200}
         
        />
      </div>
    </Link>
  );
};
