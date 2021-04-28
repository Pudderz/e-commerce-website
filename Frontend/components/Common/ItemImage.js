import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { ImageWrapper, MainImage, SecondaryImage } from "./ItemImage.styles";

export const ItemImage = ({ firstImage, secondImage, name, id, link }) => {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);


  const handleLoad = () => setLoaded(true);

  return (
    <Link href={`/product/${link}`}>
      <ImageWrapper
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!loaded && (
          <Skeleton
            variant="rect"
            style={{ position: "absolute" }}
          >
            <MainImage
              src={firstImage}
              alt={name}
              onLoad={handleLoad}
              className={hover ? "active" : ""}
              height={200}
              width={200}
              objectFit="cover"
              style={{ display: loaded ? "none" : "block" }}
            />
          </Skeleton>
        )}
        <MainImage
          src={firstImage}
          alt={name}
          onLoad={handleLoad}
          className={hover ? "active" : ""}
          height={200}
          objectFit="cover"
          width={200}
        />
        <SecondaryImage
          src={secondImage}
          alt={name}
          className={hover ? "active" : ""}
          height={200}
          objectFit="cover"
          width={200}
        />
      </ImageWrapper>
    </Link>
  );
};
