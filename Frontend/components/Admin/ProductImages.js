import { Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Image from "next/image";

export const ProductImages = ({ images }) => {
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

  const placeholder = Array.from({ length: 8 }, (v, i) => 0);

  return (
    <div className="productImages">
      <div>
        <ul
          className="productList"
          style={{ listStyle: "none", maxWidth: "100%", overflow: "auto" }}
        >
          {loaded === false ? (
            <>
              {placeholder?.map((e, index) => (
                <li key={index}>
                  <Skeleton>
                    <Button>
                      <img src="" alt="placeholder image" height="50" />
                    </Button>
                  </Skeleton>
                </li>
              ))}
            </>
          ) : (
            <>
              {images?.map((image, index) => (
                <li key={index}>
                  <Button onClick={() => changeMain(index)}>
                    <Image
                      src={`https://storage.googleapis.com/e-commerce-image-storage-202/${image}`}
                      height={50}
                      width={50}
                    />
                  </Button>
                </li>
              ))}
            </>
          )}
        </ul>

        {/* All Images */}
      </div>
      <div className="imageContainer">
        <Button
          varitan="contained"
          onClick={() => handleNextImage(-1)}
          style={{
            fontSize: "25px",
            height: "fit-content",
            borderRadius: "50px",
            width: "50px",
            height: "50px",
            alignSelf: "center",
            left: "0",
            // position: "absolute",
            // backgroundColor: "white",
          }}
        >
          <ArrowBackIosIcon />
        </Button>
        {/* Selected image in full with  buttons for nexxt and previous images*/}

        {/* <Skeleton variant="rect"> */}

        {/* Displays skeleton till image is loaded */}
        {loaded === false ? (
          <>
            <Skeleton
              variant="rect"
              width={500}
              height={500}
              style={{ margin: "20px" }}
            >
              <Image
                src={`
                https://storage.googleapis.com/e-commerce-image-storage-202/${images?.[main]}`}
                alt=""
                height="500"
                width="700"
                onLoad={() => setLoading(true)}
              />
            </Skeleton>
          </>
        ) : (
          <>
            {/* <Image
              src={images?.[main]?.url}
              alt=""
              // layout="fill"
              width={800}
              height={500}
              quality={90}
              onLoad={() => setLoading(true)}
            
            /> */}
            <Image
              src={`
https://storage.googleapis.com/e-commerce-image-storage-202/${images?.[main]}`}
              height={500}
              width={700}
              alt=""
            />
          </>
        )}

        {/* </Skeleton> */}

        <Button
          onClick={() => handleNextImage(1)}
          style={{
            height: "fit-content",
            borderRadius: "50px",
            width: "50px",
            height: "50px",
            alignSelf: "center",
            right: "0",
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};
