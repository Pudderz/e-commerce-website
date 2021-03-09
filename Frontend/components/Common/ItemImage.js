import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Skeleton from '@material-ui/lab/Skeleton';

export const ItemImage = ({ firstImage, secondImage, name, id, link }) => {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const image = useRef();

  const handleLoad = () => setLoaded(true);

  // useEffect(() => {
  //   if(image.current.complete) setLoaded(true)
  // }, [])
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
      {!loaded && (
        <Skeleton variant="rect" width={200} height={200} style={{position:'absolute', zIndex:'2'}} />
      )} 
        <Image
        // ref={image}
          src={firstImage}
          alt={name}
          onLoad={handleLoad}
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
