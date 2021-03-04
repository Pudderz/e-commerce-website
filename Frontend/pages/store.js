import React, { useState, useEffect} from "react";
import { commerce } from "../lib/commerce";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Breadcrumbs, Typography } from "@material-ui/core";
import hikingBackground from "../images/hikingBackground.jpg";
import { Filters } from "../components/StorePage/Filters";
import { ItemImage } from "../components/Common/ItemImage";
import Link from 'next/link';

export const StorePage = () => {
  const [products, setProducts] = useState(Array.from({ length: 12 }, () => 0));

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((item) => {
        setProducts(() => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <img
          src={hikingBackground}
          alt=""
          height="100%"
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            width: "100%",
            objectFit: "cover",
            left: "0",
          }}
        />
        
      </div>
      <div style={{ padding: "20px " }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Typography>Store</Typography>
        </Breadcrumbs>
        <Filters />
        <ul
          style={{
            display: "flex",
            flexFlow: "wrap",
            listStyle: "none",
            gap: "20px",
            margin: "auto",
            justifyContent: "center",
            padding: "0",
          }}
        >
          {products.map((item, index) => (
            <li key={index} style={{ width: "24%",minWidth:'150px', flexGrow:'1', maxWidth:'300px', boxSizing: "border-box" }}>
              {typeof item !== "object" ? (
                <>
                  <Typography variant="h4">
                    <Skeleton style={{ margin: "11px auto" }} />
                  </Typography>
                  <Skeleton
                    variant="rect"
                    height={300}
                    width={225}
                    style={{ margin: "0px auto" }}
                  ></Skeleton>
                  <div></div>

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
                  <h4 style={{ margin: "10px auto 0" }}>{item.name}</h4>
                  <p style={{ margin: "auto" }}>
                    {item.price.formatted_with_symbol}
                  </p>
                </>
              )}

              {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
            </li>
          ))}
        </ul>

        <RecentlyViewed />
      </div>
    </div>
  );
};


export default StorePage;