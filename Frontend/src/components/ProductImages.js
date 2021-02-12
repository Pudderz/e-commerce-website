import { Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export const ProductImages = ({ images }) => {
  console.log(typeof images === "undefined");
  const [main, setMain] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);
  const [loaded, setLoading] = useState(false);

  useEffect(() => {
    setMaxNumber(images?.length);
    return () => {};
  }, [images]);
  const changeMain = (index) => setMain(index);

  const handleNextImage = (incrementBy = 1) => {
    const newNumber = main + incrementBy;
    if (newNumber < 0) {
      setMain(images.length + newNumber);
    } else {
      setMain((main + incrementBy) % images.length);
    }
  };

  useEffect(() => {
    console.log(main);
    console.log(typeof images);
    return () => {};
  }, [main]);

  const placeholder = Array.from({ length: 8 }, (v, i) => 0);
  return (
    <div style={{ display: "flex", minWidth:'650px', margin:'auto' }}>
      <div>
        <ul style={{ listStyle: "none" }}>
          {loaded === false ? (
            <>
              {placeholder?.map((placeholder, index) => (
                <li key={index}>
                  <Skeleton>
                    <Button>
                      <img src="" height="50" />
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
                    <img src={image.url} height="50" />
                  </Button>
                </li>
              ))}
            </>
          )}
        </ul>
        {/* All Images */}
      </div>
      <div style={{ display: "flex", position:'relative' }}>
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
            // position: "absolute",
            // backgroundColor: "white",
            
          }}
        >
          <ArrowBackIosIcon/>
        </Button>
        {/* Selected image in full with  buttons for nexxt and previous images*/}

        {/* <Skeleton variant="rect"> */}

        {loaded === false ? (
          <>
            <Skeleton
              variant="rect"
              width={500}
              height={500}
              style={{ margin: "20px" }}
            >
              <img
                src={images?.[main]?.url}
                alt=""
                height="500"
                width="500"
                onLoad={() => setLoading(true)}
              />
            </Skeleton>
          </>
        ) : (
          <>
            <img
              src={images?.[main]?.url}
              alt=""
              height="500"
              onLoad={() => setLoading(true)}
              style={{
                maxWidth: "700px",
                objectFit: "cover",
                margin: "20px 0",
                width: "100%",
              }}
            />
          </>
        )}

        {/* </Skeleton> */}

        <Button onClick={() => handleNextImage(1)}
        style={{
          // fontSize: "25px",
          height: "fit-content",
          borderRadius: "50px",
          width: "50px",
          height: "50px",
          alignSelf: "center",
          // position: "absolute",
          // backgroundColor: "white",
         
        }}
        ><ArrowForwardIosIcon/></Button>
      </div>
    </div>
  );
};
