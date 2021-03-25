import React, { useState, useEffect } from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { ItemImage } from "../Common/ItemImage";


export const MostPopular = ({popularProducts}) => {
  const [products, setProducts] = useState(Array.from({ length: 4 }, () => 0));
  const [shouldShrink, setShouldShrink] = useState(false);
  // Currently fetches 4 most recent products
  // ToDO:
  // implement google analytics to work out the most popular product pages for this component


useEffect(() => {
  setProducts(popularProducts)
}, [popularProducts])
 

  const handleMinimize = () => {
    setShouldShrink(!shouldShrink);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>Most Popular</h3>
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
                  {/* <>
          <Skeleton>
            <h4>nameee</h4>
          </Skeleton>  
            
           <Skeleton
            variant="rect"
            height={300}
            width={225}
            style={{ margin: "0px auto", maxWidth:'25%', maxHeight:'20vh' }}
          ></Skeleton>
           <Skeleton>
             <p style={{margin:'5px auto'}}>pricesss</p>
            <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>

            </div>
            
           </Skeleton>
            
            </> */}
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
                    id={item.id}
                    name={item.name}
                    firstImage={item.media.source}
                    secondImage={item.assets[1].url}
                    link={item.permalink}
                  />
                  <div style={{ margin: "auto", width: "200px", textAlign:'start' }}>
                    <h4 style={{ margin: "0px", fontWeight:'500' }}>{item.name}</h4>
                    <p style={{ margin: "auto" }}>
                      {item.price.formatted_with_symbol}
                    </p>
                  </div>
                  {/* <h4
                    style={{
                      margin: "5px 0",
                      fontSize: "clamp(14px,2vw,17px)",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p style={{ margin: "5px auto" }}>
                    {item.price.formatted_with_symbol}
                  </p>
                   */}
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
