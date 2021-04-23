import { Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Image from "next/image";
import {
  ProductImagesWrapper,
  ImageContainer,
  ProductList,
  ImageButtons,
} from "./ProductImages.styles";

const placeholder = Array.from({ length: 8 }, (v, i) => 0);

export const ProductImages = ({ images, name }) => {
  const [main, setMain] = useState(0);
  const [loaded, setLoading] = useState(false);

  const changeMain = (index) => setMain(index);

  const handleNextImage = (incrementBy = 1) => {
    const newNumber = main + incrementBy;
    if (newNumber < 0) {
      setMain(images.length + newNumber);
    } else {
      setMain((main + incrementBy) % images.length);
    }
  };

  return (
    <ProductImagesWrapper>
      <ProductList>
        {loaded === false ? (
          <>
            {placeholder?.map((e, index) => (
              <li key={index}>
                <Skeleton>
                  <ImageButtons>
                    <img src="" alt={name} height="50" />
                  </ImageButtons>
                </Skeleton>
              </li>
            ))}
          </>
        ) : (
          <>
            {images?.map((image, index) => (
              <li key={index}>
                <ImageButtons onClick={() => changeMain(index)}>
                  <Image
                    src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${image}`}
                    alt={name}
                    height={50}
                    width={50}
                  />
                </ImageButtons>
              </li>
            ))}
          </>
        )}
      </ProductList>

      <ImageContainer>
        <ImageButtons style={{ left: "0" }} onClick={() => handleNextImage(-1)}>
          <ArrowBackIosIcon />
        </ImageButtons>

        {loaded === false ? (
          <>
            <Skeleton variant="rect" style={{ margin: "20px" }}>
              <Image
                src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${images?.[main]}`}
                alt={name}
                height={500}
                width={700}
                onLoad={() => setLoading(true)}
              />
            </Skeleton>
          </>
        ) : (
          <>
            <Image
              src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${images?.[main]}`}
              alt={name}
              height={500}
              width={700}
              onLoad={() => setLoading(true)}
            />
          </>
        )}

        <ImageButtons onClick={() => handleNextImage(1)} style={{ right: "0" }}>
          <ArrowForwardIosIcon />
        </ImageButtons>
      </ImageContainer>
    </ProductImagesWrapper>
  );
};
