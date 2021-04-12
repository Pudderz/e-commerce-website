import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Skeleton from "@material-ui/lab/Skeleton";

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
        
        {/* <div className="mainImage"> */}
{!loaded && (
          <Skeleton className="mainImage" variant="rect" style={{position:'absolute'}}>
            <Image
              src={firstImage}
              alt={name}
              onLoad={handleLoad}
              className={`mainImage ${hover ? "active" : ""}`}
              height={200}
              width={200}
              style={{display:(loaded)?'none':'block'}}
            />
          </Skeleton>
        )}
        <Image
          // ref={image}
          src={firstImage}
          alt={name}
          onLoad={handleLoad}
          className={`mainImage ${hover ? "active" : ""}`}
          height={200}
          width={200}
        />
        <Image
          src={secondImage}
          alt={name}
          className={`secondaryImage ${hover ? "active" : ""}`}
          height={200}
          width={200}
        />
      {/* </div> */}
        
      </div>
    </Link>
  );
};
