import React, { useState, useEffect } from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { ItemImage } from "../Common/ItemImage";

export const MostPopular = ({ popularProducts, header }) => {
  const [products, setProducts] = useState(Array.from({ length: 4 }, () => 0));
  const [shouldShrink, setShouldShrink] = useState(false);
  // Currently fetches 4 most recent products
  // ToDO:
  // implement google analytics to work out the most popular product pages for this component

  useEffect(() => {
    setProducts(popularProducts);
  }, [popularProducts]);

  const handleMinimize = () => {
    setShouldShrink(!shouldShrink);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>{header}</h3>
        <Button onClick={handleMinimize}>
          <ExpandMoreIcon />
          <ExpandLessIcon />
        </Button>
      </div>

      <hr />
      <div className={`container ${shouldShrink ? "shrink" : "dontShrink"}`}>
        <ul
          style={{
            display: "flex",
            overflowX: "auto",
            listStyle: "none",
            gap: "20px",
            margin: "0 20px",
            padding: "0",
            justifyContent: "start",
          }}
        >
          {products.map((item, index) => (
            <li
              key={index}
              style={{
                width: "24%",
                minWidth: "150px",
                boxSizing: "border-box",
              }}
            >
              {typeof item !== "object" ? (
                <>
                  <Typography variant="h4">
                    <Skeleton style={{ margin: "11px auto" }} />
                  </Typography>
                  <Skeleton
                    variant="rect"
                    height={300}
                    width={225}
                    style={{
                      margin: "0px auto",
                      maxWidth: "100%",
                      maxHeight: "20vh",
                    }}
                  ></Skeleton>

                  <Skeleton
                    height={25}
                    style={{ margin: "20px auto 0" }}
                  ></Skeleton>
                  <Skeleton
                    height={25}
                    style={{ margin: "10px auto 0" }}
                  ></Skeleton>
                </>
              ) : (
                <>
                  <ItemImage
                    id={item.id || item._id}
                    name={item.name || item.productName}
                    firstImage={
                      item?.media?.source ||
                      `${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`
                    }
                    secondImage={
                      item.assets?.[1]?.url ||
                      `${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`
                    }
                    link={item.permalink || item.slug}
                  />
                  <div
                    style={{
                      margin: "auto",
                      width: "200px",
                      textAlign: "start",
                    }}
                  >
                    <h4 style={{ margin: "0px", fontWeight: "500" }}>
                      {item.name || item.productName}
                    </h4>
                    {item.discounted ? (
                      <div
                        style={{
                          display: "flex",
                          // justifyContent: "space-around",
                          maxWidth: "200px",
                          margin: "0 auto",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#e81c1c",
                            textDecoration: "line-through",
                          }}
                        >
                          £{(item.discountedFrom / 100).toFixed(2)}
                        </span>
                        <span>£{(item.price / 100).toFixed(2)}</span>
                      </div>
                    ) : (
                      <p style={{margin:'0'}}>£{(item.price / 100).toFixed(2)}</p>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
};
